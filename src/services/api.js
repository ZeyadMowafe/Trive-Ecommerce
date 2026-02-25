import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { cartAPI } from '../api/api';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

const CartContext = createContext(null);

const CART_STORAGE_KEY = 'trive_cart';

const loadLocalCart = () => {
  try {
    const data = localStorage.getItem(CART_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveLocalCart = (items) => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
};

export function CartProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [synced, setSynced] = useState(false);
  const prevAuthState = useRef(isAuthenticated);

  const loadCart = useCallback(async () => {
    if (isAuthenticated) {
      try {
        setLoading(true);
        const cart = await cartAPI.getCart();
        setItems(cart.items);
        setSynced(true);
      } catch {
        setItems(loadLocalCart());
      } finally {
        setLoading(false);
      }
    } else {
      setItems(loadLocalCart());
    }
  }, [isAuthenticated]);

  useEffect(() => {
    loadCart();
  }, []);

  useEffect(() => {
    const justLoggedIn = !prevAuthState.current && isAuthenticated;
    prevAuthState.current = isAuthenticated;

    if (justLoggedIn) {
      const syncLocalCartToBackend = async () => {
        const localItems = loadLocalCart();
        if (localItems.length > 0) {
          for (const item of localItems) {
            try {
              await cartAPI.addToCart({
                productId: item.id,
                variantId: item.variantId || null,
                quantity: item.quantity,
              });
            } catch {
              // Skip items that fail (e.g., out of stock)
            }
          }
          localStorage.removeItem(CART_STORAGE_KEY);
        }
        await loadCart();
      };
      syncLocalCartToBackend();
    }

    if (prevAuthState.current && !isAuthenticated) {
      setItems([]);
      setSynced(false);
    }
  }, [isAuthenticated, loadCart]);

  useEffect(() => {
    if (!isAuthenticated) {
      saveLocalCart(items);
    }
  }, [items, isAuthenticated]);

  const addToCart = useCallback(
    async ({ id, variantId, quantity = 1, name, image, price, size, color, stockAvailable }) => {
      if (isAuthenticated) {
        try {
          setLoading(true);
          const cart = await cartAPI.addToCart({ productId: id, variantId, quantity });
          setItems(cart.items);
          toast.success('تم إضافة المنتج إلى السلة بنجاح 🛒');
        } catch {
          toast.error('حدث خطأ أثناء إضافة المنتج');
        } finally {
          setLoading(false);
        }
      } else {
        setItems((prev) => {
          const existing = prev.find(
            (i) => i.id === id && (i.variantId || 'default') === (variantId || 'default')
          );

          if (existing) {
            const newQuantity = existing.quantity + quantity;
            if (stockAvailable && newQuantity > stockAvailable) {
              toast.warning(`عذراً! الحد الأقصى المتاح هو ${stockAvailable} قطعة`);
              return prev;
            }
            toast.success('تمت إضافة قطعة جديدة من المنتج 🛒');
            return prev.map((i) =>
              i.id === id && (i.variantId || 'default') === (variantId || 'default')
                ? { ...i, quantity: newQuantity }
                : i
            );
          }

          if (stockAvailable && quantity > stockAvailable) {
            toast.warning(`عذراً! الحد الأقصى المتاح هو ${stockAvailable} قطعة`);
            return prev;
          }

          toast.success('تم إضافة المنتج إلى السلة بنجاح 🛒');
          return [
            ...prev,
            { id, variantId, quantity, name, image, price, size, color, stockAvailable, lineTotal: price * quantity },
          ];
        });
      }
    },
    [isAuthenticated]
  );

  const updateQuantity = useCallback(
    async (itemId, quantity) => {
      if (isAuthenticated) {
        try {
          if (quantity <= 0) {
            await cartAPI.removeCartItem(itemId);
            setItems((prev) => prev.filter((i) => i.cartItemId !== itemId));
            toast.info('تم حذف المنتج من السلة');
          } else {
            const cart = await cartAPI.updateCartItem(itemId, quantity);
            setItems(cart.items);
          }
        } catch (err) {
          console.error('Failed to update cart item', err);
          toast.error('حدث خطأ أثناء تحديث الكمية');
        }
      } else {
        if (quantity <= 0) {
          setItems((prev) => {
            const removedItem = prev.find((i) => i.id === itemId);
            if (removedItem) toast.info(`تم حذف "${removedItem.name}" من السلة`);
            return prev.filter((i) => i.id !== itemId);
          });
        } else {
          setItems((prev) => {
            const item = prev.find((i) => i.id === itemId);
            if (item?.stockAvailable && quantity > item.stockAvailable) {
              toast.warning(`عذراً! الحد الأقصى المتاح هو ${item.stockAvailable} قطعة`);
              return prev;
            }
            return prev.map((i) => (i.id === itemId ? { ...i, quantity } : i));
          });
        }
      }
    },
    [isAuthenticated]
  );

  const removeFromCart = useCallback(
    async (itemId) => {
      if (isAuthenticated) {
        try {
          await cartAPI.removeCartItem(itemId);
          setItems((prev) => prev.filter((i) => i.cartItemId !== itemId));
          toast.info('تم حذف المنتج من السلة');
        } catch (err) {
          console.error('Failed to remove cart item', err);
          toast.error('حدث خطأ أثناء حذف المنتج');
        }
      } else {
        setItems((prev) => {
          const removedItem = prev.find((i) => i.id === itemId);
          if (removedItem) toast.info(`تم حذف "${removedItem.name}" من السلة`);
          return prev.filter((i) => i.id !== itemId);
        });
      }
    },
    [isAuthenticated]
  );

  const clearCart = useCallback(async () => {
    if (isAuthenticated) {
      try {
        await cartAPI.clearCart();
      } catch {}
    }
    setItems([]);
    if (!isAuthenticated) localStorage.removeItem(CART_STORAGE_KEY);
    toast.info('تم تفريغ السلة');
  }, [isAuthenticated]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + (i.price || 0) * i.quantity, 0);
  const isInCart = (productId) => items.some((i) => i.id === productId);

  return (
    <CartContext.Provider
      value={{
        items,
        loading,
        synced,
        totalItems,
        subtotal,
        isInCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        refreshCart: loadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}

export default CartContext;
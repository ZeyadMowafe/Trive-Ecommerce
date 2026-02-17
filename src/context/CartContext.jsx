import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, size, color, quantity = 1) => {
    const inventoryItem = product.inventory?.find(
      (i) => i.size === size && i.color === color,
    );
    const stockAvailable = inventoryItem ? inventoryItem.count : 0;
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) =>
          item.id === product.id && item.size === size && item.color === color,
      );

      // if product exist
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > stockAvailable) {
          toast.warning(`عذراً! الحد الأقصى المتاح هو ${stockAvailable} قطعة`);
          return prevItems;
        }

        toast.success("تمت إضافة قطعة جديدة من المنتج ");
        return prevItems.map((item) =>
          item.id === product.id && item.size === size && item.color === color
            ? { ...item, quantity: newQuantity }
            : item,
        );
      }

      if (quantity > stockAvailable) {
        toast.warning(`عذراً! الحد الأقصى المتاح هو ${stockAvailable} قطعة`);
        return prevItems;
      }

      // new product
      toast.success("تم إضافة المنتج إلى السلة بنجاح ");

      return [
        ...prevItems,
        {
          ...product,
          size,
          color,
          quantity,
          stockAvailable,
          cartId: Date.now(),
        },
      ];
    });

    // open cart drawer
    setIsCartOpen(true);
  };

  const removeFromCart = (cartId) => {
    setCartItems((prevItems) => {
      const removedItem = prevItems.find((item) => item.cartId === cartId);

      if (removedItem) {
        toast.info(`تم حذف "${removedItem.name}" من السلة `);
      }

      return prevItems.filter((item) => item.cartId !== cartId);
    });
  };

  const updateQuantity = (cartId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(cartId);
      return;
    }

    setCartItems((prevItems) => {
      const item = prevItems.find((item) => item.cartId === cartId);

      if (!item) return prevItems;

      // Check if the new quantity exceeds the available stock
      if (newQuantity > item.stockAvailable) {
        toast.warning(
          `عذراً! الحد الأقصى المتاح هو ${item.stockAvailable} قطعة`,
        );
        return prevItems;
      }

      return prevItems.map((i) =>
        i.cartId === cartId ? { ...i, quantity: newQuantity } : i,
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const getCartQuantity = (productId, size, color) => {
    const item = cartItems.find(
      (item) =>
        item.id === productId && item.size === size && item.color === color,
    );
    return item ? item.quantity : 0;
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    getCartQuantity,
    isCartOpen,
    toggleCart,
    closeCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

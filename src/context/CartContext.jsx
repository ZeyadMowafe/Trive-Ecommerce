import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, size, color, quantity = 1) => {
<<<<<<< Updated upstream
    setCartItems(prevItems => {
      const existingItem = prevItems.find(
        item => item.id === product.id && item.size === size && item.color === color
      );

      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevItems, { ...product, size, color, quantity, cartId: Date.now() }];
    });
    
=======
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) =>
          item.id === product.id && item.size === size && item.color === color,
      );

      // if product exist
      if (existingItem) {
        toast.success("تمت إضافة قطعة جديدة من المنتج ");
        return prevItems.map((item) =>
          item.id === product.id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
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
          cartId: Date.now(),
        },
      ];
    });

    // open cart drawer
>>>>>>> Stashed changes
    setIsCartOpen(true);
  };

  const removeFromCart = (cartId) => {
<<<<<<< Updated upstream
    setCartItems(prevItems => prevItems.filter(item => item.cartId !== cartId));
=======
    setCartItems((prevItems) => {
      const removedItem = prevItems.find((item) => item.cartId === cartId);

      if (removedItem) {
        toast.info(`تم حذف "${removedItem.name}" من السلة `);
      }

      return prevItems.filter((item) => item.cartId !== cartId);
    });
>>>>>>> Stashed changes
  };

  const updateQuantity = (cartId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(cartId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.cartId === cartId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
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
    closeCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
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
<<<<<<< HEAD
    setCartItems((prevItems) => {
=======
<<<<<<< Updated upstream
    setCartItems(prevItems => {
>>>>>>> zeyad
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
<<<<<<< HEAD

    // open cart drawer
=======
    
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
>>>>>>> zeyad
    setIsCartOpen(true);
  };

  const removeFromCart = (cartId) => {
<<<<<<< HEAD
=======
<<<<<<< Updated upstream
    setCartItems(prevItems => prevItems.filter(item => item.cartId !== cartId));
=======
>>>>>>> zeyad
    setCartItems((prevItems) => {
      const removedItem = prevItems.find((item) => item.cartId === cartId);

      if (removedItem) {
        toast.info(`تم حذف "${removedItem.name}" من السلة `);
      }

      return prevItems.filter((item) => item.cartId !== cartId);
    });
<<<<<<< HEAD
=======
>>>>>>> Stashed changes
>>>>>>> zeyad
  };

  const updateQuantity = (cartId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(cartId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.cartId === cartId ? { ...item, quantity: newQuantity } : item,
      ),
    );
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

<<<<<<< HEAD
  // ✨ Function جديدة - تجيب الكمية الموجودة في الكارت لمنتج معين
=======
>>>>>>> zeyad
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

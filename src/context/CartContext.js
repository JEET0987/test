import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
<<<<<<< HEAD
    try {
      const saved = localStorage.getItem('cartItems');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    console.log('Adding to cart:', product, quantity); // Debug log
=======
    const saved = localStorage.getItem('cartItems');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
>>>>>>> f865efd25f2a7b9fe2838dcf38909f468ac7dd82
    setCartItems((prevItems) => {
      const existing = prevItems.find(item => item.id === product.id);
      if (existing) {
        return prevItems.map(item =>
<<<<<<< HEAD
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
=======
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
>>>>>>> f865efd25f2a7b9fe2838dcf38909f468ac7dd82
        );
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

<<<<<<< HEAD
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    totalPrice,
    itemCount
  };

  return (
    <CartContext.Provider value={value}>
=======
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, totalPrice, itemCount }}>
>>>>>>> f865efd25f2a7b9fe2838dcf38909f468ac7dd82
      {children}
    </CartContext.Provider>
  );
};

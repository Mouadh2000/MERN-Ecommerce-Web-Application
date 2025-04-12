import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product._id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prevItems,
          {
            id: product._id,
            imgSrc: product.image,
            name: product.name,
            price: product.price,
            quantity: 1,
            category: product.category.name
          }
        ];
      }
    });
  };

  const handleQuantityChange = (id, value) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: parseInt(value) || 1 } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  

  return (
    <CartContext.Provider
      value={{
        cartItems,
        handleAddToCart,
        handleQuantityChange,
        handleRemoveItem,
        calculateTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
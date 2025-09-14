"use client";

import { createContext, useContext, useState } from 'react';

const BasketContext = createContext();

export const useBasket = () => {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error('useBasket must be used within a BasketProvider');
  }
  return context;
};

export const BasketProvider = ({ children }) => {
  const [basketItems, setBasketItems] = useState([]);

  const addToBasket = (item) => {
    setBasketItems(prevItems => {
      // Проверяем, есть ли уже такой товар с теми же параметрами
      const existingItemIndex = prevItems.findIndex(
        basketItem => 
          basketItem.productId === item.productId && 
          basketItem.size === item.size
      );

      if (existingItemIndex !== -1) {
        // Если товар уже есть, увеличиваем количество
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + item.quantity,
          total: updatedItems[existingItemIndex].total + item.total
        };
        return updatedItems;
      } else {
        // Если товара нет, добавляем новый
        return [...prevItems, {
          ...item,
          id: Date.now() + Math.random(), // уникальный ID для корзины
        }];
      }
    });
  };

  const removeFromBasket = (itemId) => {
    setBasketItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromBasket(itemId);
      return;
    }

    setBasketItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? {
              ...item,
              quantity: newQuantity,
              total: item.price * newQuantity
            }
          : item
      )
    );
  };

  const clearBasket = () => {
    setBasketItems([]);
  };

  const getTotalPrice = () => {
    return basketItems.reduce((total, item) => total + item.total, 0);
  };

  const getTotalItems = () => {
    return basketItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getItemsByRestaurant = () => {
    return basketItems.reduce((acc, item) => {
      const restaurantName = item.restaurantName || 'Неизвестный ресторан';
      if (!acc[restaurantName]) {
        acc[restaurantName] = [];
      }
      acc[restaurantName].push(item);
      return acc;
    }, {});
  };

  const value = {
    basketItems,
    addToBasket,
    removeFromBasket,
    updateQuantity,
    clearBasket,
    getTotalPrice,
    getTotalItems,
    getItemsByRestaurant
  };

  return (
    <BasketContext.Provider value={value}>
      {children}
    </BasketContext.Provider>
  );
};
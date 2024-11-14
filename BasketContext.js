import React, { createContext, useContext, useState } from 'react';

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

    const addItemToBasket = (item) => {
        setBasketItems((prevItems) => {
            const existingItem = prevItems.find((i) => i.id === item.id);
            if (existingItem) {
                return prevItems.map((i) =>
                    i.id === item.id 
                        ? { 
                            ...i, 
                            quantity: i.quantity + item.quantity, 
                            price: item.price  
                          } 
                        : i
                );
            }
            return [...prevItems, item];
        });
    };

    const clearBasket = () => {
        setBasketItems([]);
    };

    return (
        <BasketContext.Provider value={{ basketItems, addItemToBasket, clearBasket }}>
            {children}
        </BasketContext.Provider>
    );
};

// CartContext.js
import React, { createContext, useContext, useReducer } from 'react';

// Define the initial state of the cart
const initialState = {
    cart: [],
};

// Create a context
const CartContext = createContext();

// Create a reducer function to handle state changes
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const existingProduct = state.cart.find((item) => item.id === action.payload.id);

            if (existingProduct) {
                return {
                    ...state,
                    cart: state.cart.map((item) =>
                        item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
                    ),
                };
            } else {
                return {
                    ...state,
                    cart: [...state.cart, { ...action.payload, quantity: 1 }],
                };
            }

        // Add more cases for other actions if needed
        case 'CONFIRM_ORDER':
            return {
                ...state,
                cart: [], // Clear the cart when the order is confirmed
            };

        case 'CLEAR_CART':
            return {
                ...state,
                cart: [],
            };

        default:
            return state;
    }
};

// Create a CartProvider component to wrap your app with
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    return (
        <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>
    );
};

// Create a custom hook to easily access the context in components
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

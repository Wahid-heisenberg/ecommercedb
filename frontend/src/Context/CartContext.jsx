import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
    const [addedToCart, setAddedToCart] = useState([]);



    const addToCart = (productId) => {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        if (!cartItems.includes(productId)) {
            // Add the product_ID to the local storage
            localStorage.setItem("cart", JSON.stringify([...cartItems, productId]));
            setAddedToCart([...addedToCart, productId]);
        }
    };

    useEffect(() => {
        // Retrieve the cart items from localStorage
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        setAddedToCart(cartItems);
    }, []);
    
    const removeFromCart = (item) => {
        setAddedToCart(addedToCart.filter((cartItem) => cartItem.id !== item.id));
    };

    const clearCart = () => {
        setAddedToCart([]);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems: addedToCart,
                addToCart,
                removeFromCart,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;

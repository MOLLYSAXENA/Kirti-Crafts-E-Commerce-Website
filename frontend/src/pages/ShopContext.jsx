/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from 'react';

export const ShopContext = createContext(null);

// Helper function to generate an empty cart object mapping product ID to quantity
const getDefaultCart = (products) => {
    let cart = {};
    products.forEach((product) => {
        cart[product.id] = 0; // Every product starts with 0 quantity
    });
    return cart;
};

const ShopContextProvider = (props) => {
    const [all_products, setAllProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const response = await fetch('/allproducts');
                if (!response.ok) throw new Error('Failed to fetch products');
                const products = await response.json();
                if (Array.isArray(products)) {
                    setAllProducts(products);
                    console.log('Loaded products from backend:', products.length);
                } else {
                    console.warn('Backend returned invalid data');
                }
            } catch (error) {
                console.error('Unable to fetch backend products:', error);
            }
        };
        loadProducts();
    }, []);

    useEffect(() => {
        const updatedCart = { ...cartItems };
        let changed = false;
        all_products.forEach((product) => {
            if (!(product.id in updatedCart)) {
                updatedCart[product.id] = 0;
                changed = true;
            }
        });
        if (changed) {
            setCartItems(updatedCart);
        }
    }, [all_products, cartItems]);

    const refreshProducts = async () => {
        try {
            const response = await fetch('/allproducts');
            if (!response.ok) throw new Error('Failed to refresh products');
            const products = await response.json();
            if (Array.isArray(products)) {
                setAllProducts(products);
                console.log('Refreshed products:', products.length);
            }
        } catch (error) {
            console.warn('Refresh failed:', error);
        }
    };

    // 1. Function to add an item to the cart
    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    };

    // 2. Function to decrease/remove an item from the cart
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: Math.max((prev[itemId] || 0) - 1, 0) }));
    };

    // 3. Function to calculate total item count for the Navbar bubble
    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    };

    const contextValue = { all_products, cartItems, addToCart, removeFromCart, getTotalCartItems, refreshProducts };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;

import React, { useState, createContext, } from 'react';
import axios from './utils/axios';


export const AppContext = createContext();


export const ContextProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);


    const fetchOrders = async () => {

        try {
            const response = await axios.get('/api/orders');

            setOrders(response.data);
        } catch (err) {
            console.log('Error getting orders:', err);
        }
        
    };



    const fetchProducts = async () => {
        try {
            const response = await axios.get('/api/products');

            setProducts(response.data);
        } catch (err) {
            console.log('Error getting products:', err);
        }
    };


    return (
        <AppContext.Provider value={{ 
            orders,
            products,
            fetchOrders,
            fetchProducts
        }}>
            {children}
        </AppContext.Provider>
    );
};

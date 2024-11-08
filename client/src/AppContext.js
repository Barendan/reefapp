import React, { useState, createContext, } from 'react';
import axios from './utils/axios';

export const AppContext = createContext();


export const ContextProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);


    // Fetch all orders
    const fetchOrders = async () => {

        try {
            const response = await axios.get('/api/orders');

            setOrders(response.data);
        } catch (err) {
            console.log('Error getting orders:', err);
        }
        
    };


    // Create a new order
    const createOrder = async (orderData) => {

        try {
            const response = await axios.post('/api/orders', orderData);

            setOrders([...orders, response.data]);
        } catch (error) {
            console.log('Error creating order:', error);
        }
        
    };


    // Update order status
    const updateOrderStatus = async (orderId, status) => {

        try {
            await axios.put(`/api/orders/${orderId}`, { status });

            setOrders(orders.map(order => order.id === orderId ? { ...order, status } : order));
        } catch (error) {
            console.log('Error updating order status:', error);
        }

    };



    // Fetch all products
    const fetchProducts = async () => {

        try {
            const response = await axios.get('/api/products');

            setProducts(response.data);
        } catch (err) {
            console.log('Error getting products:', err);
        }

    };


    // Create a new product
    const createProduct = async (productData) => {

        try {
            const response = await axios.post('/api/products', productData);

            setProducts([...products, response.data]);
        } catch (error) {
            console.log('Error creating product:', error);
        }

    };


    // Update product
    const updateProduct = async (id, updatedProduct) => {

        try {
            const response = await axios.put(`/api/products/${id}`, updatedProduct);

            setProducts(prevProducts => prevProducts.map(product => product.id === parseInt(id) ? 
                { ...product, ...response.data } : product
            ));
        } catch (err) {
            console.log('Error updating product:', err);
        }

    };


    // Delete product
    const deleteProduct = async (id) => {

        try {
            await axios.delete(`/api/products/${id}`);

            setProducts(products.filter(product => product.id !== id));
        } catch (err) {
            console.log('Error deleting product:', err);
        }

    };


    return (
        <AppContext.Provider value={{ 
            orders,
            products,
            fetchOrders,
            fetchProducts,
            createProduct,
            updateProduct,
            deleteProduct,
            updateOrderStatus,
            createOrder,
        }}>
            {children}
        </AppContext.Provider>
    );
};

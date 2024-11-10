import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import { AppContext } from '../AppContext';


const OrdersList = () => {
    const { orders, fetchOrders, updateOrderStatus } = useContext(AppContext);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        
        fetchOrders()

    }, []); 


    const handleStatusChange = (order_id, newStatus) => {
        updateOrderStatus(order_id, newStatus);

        setSuccessMessage('Order status updated successfully!');

        setTimeout(() => {
            setSuccessMessage('');
        }, 3000);
    };
    

    return (
        <>
            <div className="max-w-6xl mx-auto p-6 bg-gray-50 shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Orders List</h2>

                {successMessage && (
                    <div className="bg-green-500 text-white py-2 px-4 mb-6 rounded-md">
                        {successMessage}
                    </div>
                )}


                <table className="min-w-full table-auto">

                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 bg-gray-200">Order ID</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 bg-gray-200">Customer Name</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 bg-gray-200">Order Date</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 bg-gray-200">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map(order => (
                            <tr key={order.order_id} className="hover:bg-gray-100">
                                <td className="px-4 py-2 text-sm text-gray-700">{order.order_id}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">{order.customer_name}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">{new Date(order.order_date).toLocaleDateString()}</td>
                                
                                <td className="px-4 py-2 text-sm text-gray-700">
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order.order_id, e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="preparing">Preparing</option>
                                        <option value="enroute">En-route</option>
                                        <option value="delivered">Delivered</option>
                                    </select>
                                </td>
                                
                            </tr>
                        ))}
                    </tbody>
                    
                </table>

            </div>

            <div className="max-w-6xl mx-auto mt-8 text-center">
                <Link
                    to="/products"
                    className="text-blue-600 text-xl font-semibold underline hover:text-blue-700 transition duration-300"
                >
                    View All Products
                </Link>
            </div>

        </>
    );
};

export default OrdersList;




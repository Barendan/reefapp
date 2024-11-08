import React, { useContext, useEffect } from 'react';
import { AppContext } from '../AppContext';



const OrdersList = () => {
    const { orders, fetchOrders } = useContext(AppContext);
        
    useEffect(() => {
        
        fetchOrders();

    }, []); 



    return (
        <div>
            <h2>Orders List</h2>

            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer Name</th>
                        <th>Order Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map(order => (
                        
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.customer_name}</td>
                            <td>{new Date(order.order_date).toLocaleDateString()}</td>
                            <td>
                                {order.status} 
                            </td>
                        </tr>
                    
                    ))}
                </tbody>

            </table>

        </div>
    );
};

export default OrdersList;




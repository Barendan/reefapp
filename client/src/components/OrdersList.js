import React, { useContext, useEffect } from 'react';
// import { Link } from 'react-router-dom';

import { AppContext } from '../AppContext';


const OrdersList = () => {
    const { orders, fetchOrders, updateOrderStatus } = useContext(AppContext);
        

    useEffect(() => {
        
        fetchOrders()

    }, []); 


    const handleStatusChange = (orderId, newStatus) => {
        updateOrderStatus(orderId, newStatus);
    };
    

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
                    </tr>
                </thead>

                <tbody>
                    {orders.map(order => (
                        
                        <tr key={order.id}>

                            <td>{order.id}</td>
                            <td>{order.customer_name}</td>
                            <td>{new Date(order.order_date).toLocaleDateString()}</td>

                            <td>
                                <select 
                                    value={order.status} 
                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="preparing">Preparing</option>
                                    <option value="enroute">En-route</option>
                                    <option value="delivered">Delivered</option>
                                </select>
                                
                                {/* <Link to={`/order/edit/${order.id}`}>Edit</Link> */}
                            </td>

                        </tr>
                    
                    ))}
                </tbody>

            </table>

        </div>
    );
};

export default OrdersList;




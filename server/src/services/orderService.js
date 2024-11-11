const { Order } = require('../../models');



// fetch all orders
const fetchOrders = async () => {
    return await Order.findAll();
};


// create order
const createOrder = async (customer_name, status = 'pending') => {
    const newOrder = await Order.create({ customer_name, status });

    return newOrder;
};


// update order
const updateOrderStatus = async (order_id, status) => {
    const order = await Order.findOne({ where: { id: order_id } });

    if (!order) throw new Error('Order not found');
    order.status = status;

    await order.save();

    return order
};


module.exports = { fetchOrders, createOrder, updateOrderStatus };

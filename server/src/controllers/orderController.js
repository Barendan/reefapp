const { validationResult } = require('express-validator');
const { fetchOrders, createOrder, updateOrderStatus } = require('../services/orderService.js');


const handleValidationErrors = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
};


const fetchOrdersHandler = async (req, res) => {
    try {
        const orders = await fetchOrders();
        res.json(orders);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
};


const createOrderHandler = async (req, res) => {
    handleValidationErrors(req, res);

    const { customer_name, status } = req.body;

    try {
        const newOrder = await createOrder(customer_name, status);
        res.json(newOrder);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
};


const updateOrderHandler = async (req, res) => {
    const { status } = req.body;

    handleValidationErrors(req, res);

    console.log('req.params.id:', req.params);
    try {
        const updatedOrder = await updateOrderStatus(req.params.id, status);
        res.json(updatedOrder);
    } catch (err) {
        if (err.message === 'Order not found') {
            return res.status(404).json({ msg: 'Order not found' });
        }

        console.log(err.message);
        res.status(500).send('Server error');
    }
};



module.exports = { fetchOrdersHandler, createOrderHandler, updateOrderHandler };

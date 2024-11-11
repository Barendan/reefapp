const express = require('express');
const pool = require('../config/db');
const { check, validationResult } = require('express-validator');
const authMiddleware = require('../src/middleware/authMiddleware');

const router = express.Router();


// Get all orders
router.get('/', async (req, res) => {

    try {
        const orders = await pool.query('SELECT * FROM orders');

        res.json(orders.rows);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }

});


// Create a new order
router.post('/', authMiddleware, [
    check('customer_name', 'Customer name is required').not().isEmpty(),
    check('status', 'Status is required').optional().isIn(['pending', 'preparing', 'enroute', 'delivered'])
], async (req, res) => {
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    const { customer_name, status } = req.body;

    
    try {
        const newOrder = await pool.query(
            'INSERT INTO orders (customer_name, status) VALUES ($1, $2) RETURNING *',
            [customer_name, status || 'pending']
        );

        res.json(newOrder.rows[0]);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }

});


// Update order by id
router.put('/:id', authMiddleware, async (req, res) => {
    const { status } = req.body;


    try {
        const updatedOrder = await pool.query(
            'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
            [status, req.params.id]
        );


        if (updatedOrder.rows.length === 0) {
            return res.status(404).json({ msg: 'Order not found' });
        }


        res.json(updatedOrder.rows[0]);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }

});



module.exports = router;

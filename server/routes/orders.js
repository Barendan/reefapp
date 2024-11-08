const express = require('express');
const pool = require('../db');
const { check, validationResult } = require('express-validator');

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
router.post('/', [
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


// Get order by id


// Update order by id


// Delete order by id



module.exports = router;

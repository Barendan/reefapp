const express = require('express');
const pool = require('../db');
const { check, validationResult } = require('express-validator');

const router = express.Router();


// Get all products
router.get('/', async (req, res) => {

    try {
        const products = await pool.query('SELECT * FROM products');

        res.json(products.rows);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }

});


// Create new product
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('price', 'Price is required').isNumeric(),
    check('image_url', 'Image URL must be a valid URL').isURL()
], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    const { name, description, price, image_url } = req.body;


    try {
        const newProduct = await pool.query(
            'INSERT INTO products (name, description, price, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, description, price, image_url]
        );

        res.json(newProduct.rows[0]);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
    
});


// Get product by id


// Update product by id


// Delete product by id




module.exports = router;

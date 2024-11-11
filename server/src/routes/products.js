const express = require('express');
const pool = require('../config/db');
const { check, validationResult } = require('express-validator');
const authMiddleware = require('../src/middleware/authMiddleware');

const router = express.Router();


// Get all products
router.get('/', authMiddleware, async (req, res) => {

    try {
        const products = await pool.query('SELECT * FROM products');

        res.json(products.rows);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }

});


// Create new product
router.post('/', authMiddleware, [
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
router.get('/:id', authMiddleware, async (req, res) => {

    try {
        const product = await pool.query('SELECT * FROM products WHERE id = $1', [req.params.id]);
        
        if (product.rows.length === 0) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        res.json(product.rows[0]);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
    
});


// Update product by id
router.put('/:id', authMiddleware, async (req, res) => {
    const { name, description, price, image_url } = req.body;

    try {
        const product = await pool.query('SELECT * FROM products WHERE id = $1', [req.params.id]);
        
        if (product.rows.length === 0) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        const updatedProduct = await pool.query(
            'UPDATE products SET name = $1, description = $2, price = $3, image_url = $4 WHERE id = $5 RETURNING *',
            [name || product.rows[0].name, description || product.rows[0].description, price || product.rows[0].price, image_url || product.rows[0].image_url, req.params.id]
        );

        res.json(updatedProduct.rows[0]);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }

});


// Delete product by id
router.delete('/:id', authMiddleware, async (req, res) => {

    try {
        const product = await pool.query('SELECT * FROM products WHERE id = $1', [req.params.id]);
        
        if (product.rows.length === 0) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        await pool.query('DELETE FROM products WHERE id = $1', [req.params.id]);

        res.json({ msg: 'Product deleted' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }

});



module.exports = router;

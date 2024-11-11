const { validationResult } = require('express-validator');
const {
    fetchProducts,
    fetchProductById,
    createProduct,
    updateProduct,
    removeProduct
} = require('../services/productService.js');



const handleValidationErrors = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
};


// fetch products
const fetchProductsHandler = async (req, res) => {
    try {
        const products = await fetchProducts();
        res.json(products);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
};


// fetch single product
const fetchProductByIdHandler = async (req, res) => {
    try {
        const product = await fetchProductById(req.params.id);

        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        res.json(product);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
};


// create product
const createProductHandler = async (req, res) => {
    handleValidationErrors(req, res);

    try {
        const newProduct = await createProduct(req.body);
        res.json(newProduct);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
};


// update product
const updateProductHandler = async (req, res) => {
    try {
        const updatedProduct = await updateProduct(req.params.id, req.body);

        if (!updatedProduct) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        res.json(updatedProduct);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
};


// delete product
const deleteProductHandler = async (req, res) => {
    try {
        const deleted = await removeProduct(req.params.id);

        if (!deleted) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        res.json({ msg: 'Product deleted' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = { 
    fetchProductsHandler, 
    fetchProductByIdHandler, 
    createProductHandler, 
    updateProductHandler, 
    deleteProductHandler 
};

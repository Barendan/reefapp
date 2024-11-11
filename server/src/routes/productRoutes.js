const { Router } = require('express');

const authMiddleware = require('../middleware/authMiddleware.js');
const { createProductValidation, updateProductValidation } = require('../middleware/validation.js');
const { 
    fetchProductsHandler, 
    fetchProductByIdHandler, 
    createProductHandler, 
    updateProductHandler, 
    deleteProductHandler 
} = require('../controllers/productController.js');


const router = Router();


// fetch products route
router.get('/', authMiddleware, fetchProductsHandler);


// fetch product route
router.get('/:id', authMiddleware, fetchProductByIdHandler);


// create product route
router.post('/', authMiddleware, createProductValidation, createProductHandler);


// update product route
router.put('/:id', authMiddleware, updateProductValidation, updateProductHandler);


// delete product route
router.delete('/:id', authMiddleware, deleteProductHandler);



module.exports = router;

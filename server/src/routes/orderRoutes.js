const { Router } = require('express');

const authMiddleware = require('../middleware/authMiddleware.js');
const { createOrderValidation, updateOrderValidation } = require('../middleware/validation.js');
const { 
    fetchOrdersHandler, 
    createOrderHandler, 
    updateOrderHandler 
} = require('../controllers/orderController.js');


const router = Router();


// fetch orders route
router.get('/', authMiddleware, fetchOrdersHandler);


// create order route
router.post('/', authMiddleware, createOrderValidation, createOrderHandler);


// update order route
router.put('/:id', authMiddleware, updateOrderValidation, updateOrderHandler);



module.exports = router;

const { check } = require('express-validator');


const registerValidation = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please use a valid email').isEmail(),
  check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
];

const loginValidation = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
];

const createOrderValidation = [
  check('customer_name', 'Customer name is required').not().isEmpty(),
  check('status', 'Invalid status').optional().isIn(['pending', 'preparing', 'enroute', 'delivered']),
];

const updateOrderValidation = [
  check('status', 'Status is required').not().isEmpty().isIn(['pending', 'preparing', 'enroute', 'delivered']),
];

const createProductValidation = [
  check('name', 'Name is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
  check('price', 'Price is required').isNumeric(),
  check('image_url', 'Image URL must be a valid URL').isURL(),
];

const updateProductValidation = [
  check('name', 'Name is required').optional().not().isEmpty(),
  check('description', 'Description is required').optional().not().isEmpty(),
  check('price', 'Price is required').optional().isNumeric(),
  check('image_url', 'Image URL must be a valid URL').optional().isURL(),
];



module.exports = { 
  registerValidation, 
  loginValidation,
  createOrderValidation,
  updateOrderValidation,
  createProductValidation,
  updateProductValidation 
};

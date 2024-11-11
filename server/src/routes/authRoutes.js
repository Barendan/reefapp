const { Router } = require('express');

const { registerValidation, loginValidation } = require('../middleware/validation.js');
const { registerUserHandler, loginUserHandler } = require('../controllers/authController.js');

const router = Router();


// register route
router.post('/register', registerValidation, registerUserHandler);


// login route
router.post('/login', loginValidation, loginUserHandler);



module.exports = router;

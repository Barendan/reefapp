const { validationResult } = require('express-validator');
const { registerUser, loginUser, generateToken } = require('../services/authService.js');


const handleValidationErrors = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
};


const registerUserHandler = async (req, res) => {

    handleValidationErrors(req, res);

    const { name, email, password } = req.body;

    try {
        const newUser = await registerUser(name, email, password);
        const token = generateToken(newUser.id);

        res.json({ token });
    } catch (err) {

        console.log(err.message);
        res.status(500).send('Server error');
    }

};


const loginUserHandler = async (req, res) => {

    handleValidationErrors(req, res);

    const { email, password } = req.body;

    try {
        const user = await loginUser(email, password);
        const token = generateToken(user.id);

        res.json({ token });
    } catch (err) {

        console.log(err.message);
        res.status(500).send('Server error');
    }
    
};


module.exports = { registerUserHandler, loginUserHandler };

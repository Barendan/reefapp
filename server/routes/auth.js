const express = require('express');
const pool = require('../config/db');
const { check, validationResult } = require('express-validator');
require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const router = express.Router();


// Register a new user
router.post('/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please use a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    const { name, email, password } = req.body;


    try {
        const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        
        // If user exists, do not proceed
        if (userExists.rows.length > 0) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);


        const newUser = await pool.query(
            'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
            [name, email, passwordHash]
        );

        const token = jwt.sign({ id: newUser.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
    
});


// Login with user credentials
router.post('/login', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        

        if (user.rows.length === 0) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        

        const isMatch = await bcrypt.compare(password, user.rows[0].password_hash);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }

});


module.exports = router;

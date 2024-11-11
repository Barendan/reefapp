const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../../models');


// register new user
const registerUser = async (name, email, password) => {
    const user = await User.findOne({ where: { email } });

    if (user) {
        throw new Error('User already exists');
    }
    
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        name,
        email,
        password_hash: passwordHash,
    });

    return newUser;
};


// login user
const loginUser = async (email, password) => {
    const user = await User.findOne({ where: { email } });

    if (!user) {
        throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    return user;
};



// function to generate JWT
const generateToken = (user_id) => {
    const token = jwt.sign({ id: user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return token;
};



module.exports = { registerUser, loginUser, generateToken };

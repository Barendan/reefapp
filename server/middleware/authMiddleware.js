const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './config/.env' });


const authMiddleware = (req, res, next) => {
    const token = req.header('x-auth-token');
    
    if (!token) {
        return res.status(401).json({ msg: 'No token, access denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = decoded.id;

        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
    
};

module.exports = authMiddleware;

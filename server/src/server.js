const express = require('express');
const cors = require('cors');

require('dotenv').config();
const { Sequelize } = require('sequelize');

const authRoutes = require('./routes/authRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');
const productRoutes = require('./routes/productRoutes.js');


const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false, // Disable logging for production
});
  

sequelize.authenticate()
    .then(() => {
        console.log('Database connected!');
    })
    .catch(err => {
        console.error('Database connection failed:', err);
    });



app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

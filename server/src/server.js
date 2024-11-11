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


app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);


const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
});
  

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected!');

        const server = app.listen(PORT, () => {
            console.log('Server running on port 5000');
        });

        return server;
    } catch (err) {
        console.error('Unable to connect to the database:', err);
        process.exit(1);
    }
};


module.exports = { startServer, app };

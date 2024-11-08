const express = require('express')
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const PORT = process.env.PORT || 5000;
const app = express();


app.use(cors())
app.use(express.json());


app.use('/api/auth', authRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



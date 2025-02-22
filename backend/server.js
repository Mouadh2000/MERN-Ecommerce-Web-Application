const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./src/config/db');
const adminRoutes = require('./src/routes/adminRoutes');


const app = express();

const corsOptions = {
    origin: [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localholst:3002"
    ],
    methods: ['GET', 'POST', 'PUT', 'OPTIONS', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

connectDB();

app.use(express.json());

app.use('/api/admin', adminRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
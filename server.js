const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const allowedOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',')
    : ['http://localhost:3000', 'http://localhost:3001'];

app.use(cors({ origin: allowedOrigins, credentials: true }));

const UserRoutes = require('./Routers/UserRoutes');
const AdminRoutes = require('./Routers/AdminRoutes');
const PetRoutes = require('./Routers/PetRoutes');
app.use('/api/user', UserRoutes);
app.use('/api/admin', AdminRoutes);
app.use('/api/pets', PetRoutes);

app.get('/', (req, res) => res.json({ message: 'PawsHome API is running' }));

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

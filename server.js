const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000", "http://localhost:3001"], credentials: true }));

const UserRoutes = require("./Routers/UserRoutes");
const AdminRoutes = require("./Routers/AdminRoutes");
const PetRoutes = require("./Routers/PetRoutes");
app.use("/api/user", UserRoutes);
app.use("/api/admin", AdminRoutes);
app.use("/api/pets", PetRoutes);

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

app.listen(5001, () => {
    console.log("Server is running on port 5001");
});

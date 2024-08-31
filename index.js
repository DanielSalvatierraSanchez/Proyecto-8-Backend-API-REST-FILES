require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./src/config/db');
const { connectCloudinary } = require('./src/config/cloudinary');
const ingredientRoutes = require('./src/api/routes/ingredient');
const cakeRoutes = require('./src/api/routes/cake');

const app = express();
connectDB();
connectCloudinary();

app.use(cors());
app.use(express.json());

app.use('/api/v1/ingredient', ingredientRoutes)
app.use('/api/v1/cake', cakeRoutes)

app.use("*", (req, res, next) => {
return res.status(404).json("Route Not Found")
});

app.listen(3000, () => {
    console.log("✅ Server Ready!!! http://localhost:3000");
});
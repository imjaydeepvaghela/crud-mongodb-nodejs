// Import required modules
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize Express application
const app = express();

// Import routes and middleware
const productRoute = require('./routes/productRoute');
const errorMiddleware = require('./middleware/errorMiddleware');

const cookieParser = require("cookie-parser");
const { adminAuth, userAuth } = require("./auth/middleware/auth");

// Middleware setup
app.use(express.json()); // Parse incoming request bodies as JSON
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(cors()); // Enable CORS for all routes
app.use('/api/products', productRoute); // Set up product route
app.use(errorMiddleware); // Error handling middleware
app.use("/api/auth", require("./auth/route"));
app.use(cookieParser());

app.get("/admin", adminAuth, (req, res) => res.send("Admin Route"));
app.get("/basic", userAuth, (req, res) => res.send("User Route"));

// Configuration
const MONGO_ENV = process.env.MONGO_ENV; // MongoDB connection string
const PORT = process.env.PORT || 3000; // Port to run the server, default to 3000 if not specified in .env

// Connect to MongoDB and start the server
mongoose.connect(MONGO_ENV)
    .then(() => {
        // Start listening on the specified port
        app.listen(PORT, () => {
            console.log(`App running on port ${PORT}`);
        });
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });

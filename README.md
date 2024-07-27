# CRUD Application with Node.js, Express.js, and MongoDB

This repository contains a full-featured CRUD (Create, Read, Update, Delete) application built using Node.js with the Express.js framework and MongoDB database. The application focuses on managing product data, allowing users to perform CRUD operations on product records seamlessly.

## Project Overview

This project implements a CRUD application following the MVC (Model-View-Controller) architecture. It enables users to interact with product data stored in a MongoDB database through a set of RESTful API endpoints.

## Architecture Overview

The project structure follows the MVC pattern:

- **Model**: Defines the data structure and schema for products.
- **Controller**: Contains the logic for handling requests and interacting with the model.
- **Routes**: Defines the endpoints and routes for the application.
- **Middleware**: Custom middleware for error handling and request parsing.

## Server Configuration

The server setup involves initializing the Express application, setting up middleware, and establishing a connection to MongoDB.

## Product Model

The model defines the schema for product data using Mongoose. It includes fields such as name, quantity, price, and image.

## Product Controller

The controller contains the logic for CRUD operations on product data. It includes functions to fetch all products, get a product by ID, add a new product, update a product, and delete a product.

## Product Routes

The routes file defines the endpoints for product-related operations. It maps HTTP methods to controller functions for handling requests.

## Error Handling Middleware

The error handling middleware ensures that errors are caught and managed effectively. It logs errors and sends appropriate error responses to clients.

## Running the Application

To run the application:

1. Ensure MongoDB is installed, running, and accessible.
2. Install the required dependencies using `npm install`.
3. Start the server with the command `node server.js`.

The application listens on port 3000 by default.

## Dependencies

The application relies on the following dependencies:

- `dotenv`
- `express`
- `mongoose`
- `cors`
- `express-async-handler`

User Authentication with JWT
This Node.js application provides user registration and role-based authentication using JSON Web Tokens (JWT) and MongoDB.

Features
User Roles:

Admin: Can manage users and update roles.
Basic: Regular user with limited access.
JWT Authentication:

Register: Hashes passwords using bcrypt, generates a JWT token, and sets it as an HTTP-only cookie.
Login: Authenticates users by comparing hashed passwords, generates a JWT token, and sends it as an HTTP-only cookie.
Role-Based Access Control:

Admin Authentication: Middleware to protect routes and allow access only to users with an "admin" role.
User Authentication: Middleware to allow access only to users with a "Basic" role.
CRUD Operations:

Register: Create new users.
Login: Authenticate and log in users.
Update: Change a user's role (restricted to admins).
Delete: Remove a user from the database (restricted to admins).
Middleware:

Authentication Middleware: Verifies JWT tokens and checks user roles for protected routes.

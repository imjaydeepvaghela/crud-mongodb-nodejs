# CRUD Application with Node.js, Express.js, and MongoDB

This repository contains a full-featured CRUD (Create, Read, Update, Delete) application built using Node.js with the Express.js framework and MongoDB database. The application focuses on managing product data, allowing users to perform CRUD operations on product records seamlessly.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Server Configuration (server.js)](#server-configuration-serverjs)
   - [Initialization](#initialization)
   - [Endpoints](#endpoints)
   - [Error Handling](#error-handling)
3. [Product Model (productModel.js)](#product-model-productmodeljs)
   - [Model Schema](#model-schema)
   - [Timestamps](#timestamps)
   - [Exporting Model](#exporting-model)
4. [Running the Application](#running-the-application)
5. [Dependencies](#dependencies)

## Project Overview

This project is a CRUD application that leverages Node.js, Express.js, and MongoDB to manage product data. Users can perform various operations on product records such as adding new products, retrieving existing products, updating product details, and deleting products.

## Server Configuration (server.js)

### Initialization
The server setup starts with importing the required modules and initializing the Express application.

- **Modules Imported:**
  - `express`: A minimal and flexible Node.js web application framework.
  - `mongoose`: An ODM (Object Data Modeling) library for MongoDB and Node.js.

- **Express Application:**
  An instance of the Express application is created.

- **MongoDB Connection:**
  The connection to MongoDB is established using a connection string. This ensures the application is ready to interact with the database.

### Endpoints
The application provides RESTful endpoints for managing product data.

- **POST /product:**
  - Description: Adds new product data.
  - Request: Product data is sent in the request body.
  - Response: The new product is stored in the MongoDB database.

- **GET /product:**
  - Description: Retrieves all product data.
  - Response: Returns all product records as a JSON array.

- **GET /product/:id:**
  - Description: Retrieves product data by its unique ID.
  - Response: Returns the product record with the specified ID.

- **PUT /product/:id:**
  - Description: Updates existing product data based on its ID.
  - Request: Updated product data is sent in the request body.
  - Response: Updates the product record in the database.

- **DELETE /product/:id:**
  - Description: Deletes product data based on its ID.
  - Response: Removes the product record from the database.

### Error Handling
Error handling is robustly implemented for each endpoint to ensure any potential errors are caught and managed effectively.

- **Error Logging:** Errors are logged to the console for debugging purposes.
- **Error Responses:** Appropriate error responses with status codes are sent back to the client to inform them of any issues.

## Product Model (productModel.js)

### Model Schema
The schema for the product data is defined using Mongoose in `productModel.js`.

- **Fields:**
  - `name`: Required field of type String.
  - `quantity`: Required field of type Number with a default value of 0.
  - `price`: Required field of type Number.
  - `image`: Optional field of type String.

### Timestamps
The schema includes a timestamps option set to `true`, which automatically adds `createdAt` and `updatedAt` fields to each document. These fields track the creation and update times of each product record.

### Exporting Model
The Product model is created using `mongoose.model()` with the defined schema and is exported for use in other parts of the application.

## Running the Application

To run the application, follow these steps:

1. Ensure MongoDB is installed, running, and accessible.
2. Install the required dependencies using `npm install`.
3. Start the server with the command `node server.js`.
4. The application listens on port 3000 by default.

```bash
npm install
node server.js
```

## Dependencies
The application relies on the following dependencies:

- `express`: For building the web server and handling routing.
- `mongoose`: For interacting with MongoDB and defining the data schema.
- `body-parser`: To parse incoming request bodies in a middleware before your handlers, available under the `req.body` property (ensure it's added if not mentioned).

By providing detailed information on the structure and functionality of the server and the product model, this README offers a comprehensive guide to understanding and running the CRUD application.

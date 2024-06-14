const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');

// Get all products
const getProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get product by ID
const getProductByID = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            res.status(404);
            throw new Error(`Product with ID ${id} not found`);
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Add a new product
const addProduct = asyncHandler(async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a product by ID
const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedProduct) {
            res.status(404);
            throw new Error(`Product with ID ${id} not found`);
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a product by ID
const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            res.status(404);
            throw new Error(`Product with ID ${id} not found`);
        }
        res.status(200).json({ message: `Product with ID ${id} has been deleted` });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = {
    getProducts,
    getProductByID,
    addProduct,
    updateProduct,
    deleteProduct
};

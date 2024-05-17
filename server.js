const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Product = require('./Model/productModel');
app.use(express.json())


mongoose.connect('mongodb+srv://imjaydeepvaghela:admin123@devtaminapi.d20vwjn.mongodb.net/Node-API?retryWrites=true&w=majority&appName=DevtaminAPI')
.then(() => {
    app.listen(3000, ()=> {
        console.log('App running on port 3000')
    })
    console.log("Connected to MongoDB")
})
.catch((err)=> {
    console.log(err);
})


// To add the product data using POST request
app.post('/product', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// To get the product data using GET request
app.get('/product', async(req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// To find the product data by ID
app.get('/product/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// To update the product data by ID
app.put('/product/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            return res.status(404).json({message: `Cannot find any product with ID ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// To delete the product data by ID
app.delete('/product/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id, req.body);
        if (!product) {
            return res.status(404).json({message: `Cannot find any product with ID ${id}`})
        }
        res.status(200).json({message: `The product named ${product.name} has been successfully deleted.`});
    } 
    catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})


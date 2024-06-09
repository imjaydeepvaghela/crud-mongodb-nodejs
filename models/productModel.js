const mongoose = require('mongoose');

// Define the product schema with validation and default values
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'The name field is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'The quantity field is required'],
      default: 0,
      min: [0, 'Quantity cannot be negative']
    },
    price: {
      type: Number,
      required: [true, 'The price field is required'],
      min: [0, 'Price cannot be negative']
    },
    image: {
      type: String
    },
  },
  {
    timestamps: true,  // Automatically adds createdAt and updatedAt fields
  }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;

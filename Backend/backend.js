const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const Category = require('./models/Category');
const Product = require('./models/Product');

connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    console.error('Error fetching categories:', err.message);
    res.status(500).json({ message: 'Server Error: Could not fetch categories.' });
  }
});

app.get('/api/products/:categoryId', async (req, res) => {
  try {
    const { categoryId } = req.params;
    const products = await Product.find({ categoryId: categoryId });
    res.json(products);
  } catch (err) {
    console.error(`Error fetching products for category ${req.params.categoryId}:`, err.message);
    res.status(500).json({ message: 'Server Error: Could not fetch products.' });
  }
});

app.get('/api/product/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findOne({ id: productId });
    if (!product) {
      return res.status(404).json({ message: `Product with ID '${productId}' not found.` });
    }
    res.json(product);
  } catch (err) {
    console.error(`Error fetching product ${req.params.productId}:`, err.message);
    res.status(500).json({ message: 'Server Error: Could not fetch product details.' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
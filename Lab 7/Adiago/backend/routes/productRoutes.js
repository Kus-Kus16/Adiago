const express = require('express');
const Product = require('../models/Product');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll()

        if (!products || products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch products' });
    }
});

router.get('/:productId', async (req, res) => {
    const productId = req.params.productId;

    try {
        const product = await Product.findOne({ where: {id: productId} })

        if (!product) {
            return res.status(404).json({ message: 'Product does not exist' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch product' });
    }
});

router.post('/add', verifyToken, async (req, res) => {
    const {title, price, description, category, image, rating, ratingCount} = req.body;

    if (!title || !price || !description || !category || !image || !rating || !ratingCount) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    if (isNaN(price) || isNaN(rating) || isNaN(ratingCount)) {
        return res.status(400).json({ message: 'Invalid number format' });
    }

    try {
        await Product.create({ title, price, description, category, image, rating, ratingCount })

        res.status(200).json({ message: 'Product added succesfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add product' });
    }

});

module.exports = router;
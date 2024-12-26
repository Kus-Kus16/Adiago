const express = require('express');
const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add', verifyToken, async (req, res) => {
    const {productId, productName, productPrice, quantity} = req.body;
    const userId = req.user.id;

    if (!productId || !quantity || isNaN(quantity) || quantity <= 0 || !productName || !productPrice) {
        return res.status(400).json({ message: 'Values missing' });
    }

    try {
        let cart = await Order.findOne({ where: {userId, type: "CART"} });

        if (!cart) {
            cart = await Order.create({ userId, type: "CART" });
        }

        const item = await OrderDetail.findOne({ where: { orderId: cart.id, productId } });

        if (item) {
            item.quantity += quantity;
            await item.save();
        } else {
            await OrderDetail.create({ orderId: cart.id, productId, productName, productPrice, quantity })
        }

        res.status(200).json({ message: 'Product added to cart' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add product to cart' });
    }

});

router.get('/', verifyToken, async (req, res) => {
    const userId = req.user.id;

    try {
        let cart = await Order.findOne({ 
            where: {userId, type: "CART"},
            include: {
                model: OrderDetail
            } 
        });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch cart' });
    }
});

router.patch('/patch', verifyToken, async (req, res) => {
    const {productId, quantity} = req.body;
    const userId = req.user.id;

    if (!productId || isNaN(quantity) || quantity < 0) {
        return res.status(400).json({ message: 'Invalid productId or quantity' });
    }

    try {
        const cart = await Order.findOne({ where: {userId, type: "CART"} });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const item = await OrderDetail.findOne({ where: { orderId: cart.id, productId } });

        if (!item) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        if (quantity === 0) {
            await item.destroy();
            return res.status(200).json({ message: 'Item removed from cart' });
        }

        item.quantity = quantity;
        await item.save();

        res.status(200).json({ message: 'Item quantity changed', item });
    } catch (error) {
        res.status(500).json({ message: 'Failed to change product quantity' });
    }

});

router.delete('/remove/:productId', verifyToken, async (req, res) => {
    const userId = req.user.id;
    const productId = req.params.productId;

    try {
        const cart = await Order.findOne({ where: {userId, type: "CART"} });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const item = await OrderDetail.findOne({ where: { orderId: cart.id, productId } });

        if (!item) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        await item.destroy();
        
        res.status(200).json({ message: 'Item removed from cart' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to remove item from cart' });
    }

});

module.exports = router;
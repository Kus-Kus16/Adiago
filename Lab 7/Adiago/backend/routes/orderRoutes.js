const express = require('express');
const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add', verifyToken, async (req, res) => {
    const userId = req.user.id;

    try {
        let cart = await Order.findOne({ 
            where: {userId, type: "CART"},
            include: {
                model: OrderDetail
            } 
        });

        if (!cart || !cart.OrderDetails || cart.OrderDetails.length === 0) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.type = "ORDER";
        await cart.save();
        
        res.status(200).json({ message: 'Order placed succesfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to place order' });
    }

});

router.get('/', verifyToken, async (req, res) => {
    const userId = req.user.id;

    try {
        let orders = await Order.findAll({ 
            where: {userId, type: "ORDER"},
            include: {
                model: OrderDetail
            } 
        });

        if (orders.length === 0) {
            return res.status(404).json({ message: 'Orders not found' });
        }

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch orders' });
    }
});

module.exports = router;
const express = require('express');
const Review = require('../models/Review');
const { verifyToken } = require('../middleware/authMiddleware');
const User = require('../models/User');
const router = express.Router();

router.post('/add/:productId', verifyToken, async (req, res) => {
    const {positive, content} = req.body;
    const userId = req.user.id;
    const productId = req.params.productId;

    try {
        let oldReview = await Review.findOne({ where: { userId, productId } });

        if (oldReview) {
            return res.status(409).json({ message: 'Review already exists' });
        }

        const review = await Review.create({ userId, productId, positive, content })

        res.status(200).json({ message: 'Review added' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add review' });
    }

});

router.get('/:productId', async (req, res) => {
    const productId = req.params.productId;

    try {
        let reviews = await Review.findAll({ 
            where: { productId },
            include: {
                model: User,
                attributes: ['username', 'email']
            } 
        });

        res.status(200).json(reviews);
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: 'Failed to fetch reviews' });
    }
});

router.patch('/patch/:productId', verifyToken, async (req, res) => {
    const {positive, content} = req.body;
    const userId = req.user.id;
    const productId = req.params.productId;

    try {
        let review = await Review.findOne({ where: { userId, productId } });

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        review.positive = positive;
        review.content = content;
        await review.save();

        res.status(200).json({ message: 'Review changed', review });
    } catch (error) {
        res.status(500).json({ message: 'Failed to change review' });
    }

});

router.delete('/remove/:productId', verifyToken, async (req, res) => {
    const userId = req.user.id;
    const productId = req.params.productId;

    try {
        let review = await Review.findOne({ where: { userId, productId } });

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        await review.destroy();

        res.status(200).json({ message: 'Review deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete review' });
    }

});

module.exports = router;
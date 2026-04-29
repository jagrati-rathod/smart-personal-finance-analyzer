const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const User = require('../models/User');

// @route   GET /api/users/profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
    res.status(200).json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        budget: req.user.budget,
        categoryLimits: req.user.categoryLimits,
        healthProfile: req.user.healthProfile
    });
});

// @route   POST /api/users/budget
// @access  Private
router.post('/budget', protect, async (req, res) => {
    try {
        const { budget } = req.body;
        
        if (budget === undefined) {
             return res.status(400).json({ message: 'Budget is required' });
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { budget },
            { new: true }
        );

        res.status(200).json({ budget: user.budget });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST /api/users/limits
// @access  Private
router.post('/limits', protect, async (req, res) => {
    try {
        const { category, amount } = req.body;

        if (!category || amount === undefined) {
            return res.status(400).json({ message: 'Category and amount are required' });
        }

        const user = await User.findById(req.user.id);
        
        if (!user.categoryLimits) {
            user.categoryLimits = new Map();
        }
        
        user.categoryLimits.set(category, amount);
        await user.save();

        res.status(200).json({ categoryLimits: user.categoryLimits });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST /api/users/health
// @access  Private
router.post('/health', protect, async (req, res) => {
    try {
        const { healthProfile } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { healthProfile },
            { new: true }
        );

        res.status(200).json({ healthProfile: user.healthProfile });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;

const express = require('express');
const { getCategories, createCategory } = require('../controllers/categoryController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Public route
router.get('/', getCategories);

// Protected route (admin/user can create)
router.post('/', protect, createCategory);

module.exports = router;

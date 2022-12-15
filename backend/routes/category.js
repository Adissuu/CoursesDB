const express = require('express');
const router = express.Router();
const { create, list, read, remove } = require('../controllers/category');

//validators
const { runValidation } = require('../validators');
const { categoryCreateValidator } = require('../validators/category');
const { requireSignIn, authMiddleware, adminMiddleware } = require('../controllers/auth');


router.post('/category', categoryCreateValidator, requireSignIn, adminMiddleware, create);
router.get('/categories', list);
router.get('/category/:slug', read);
router.delete('/category/:slug', requireSignIn, adminMiddleware, remove);

module.exports = router;
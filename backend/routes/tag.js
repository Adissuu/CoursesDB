const express = require('express');
const router = express.Router();
const { create, list, read, remove } = require('../controllers/category');

//validators
const { runValidation } = require('../validators');
const { tagCreateValidator } = require('../validators/tag');
const { requireSignIn, authMiddleware, adminMiddleware } = require('../controllers/auth');


router.post('/tag', tagCreateValidator, requireSignIn, adminMiddleware, create);
router.get('/tags', list);
router.get('/tag/:slug', read);
router.delete('/tag/:slug', requireSignIn, adminMiddleware, remove);

module.exports = router;
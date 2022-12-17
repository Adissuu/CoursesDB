const express = require('express');
const router = express.Router();

//validators
const { runValidation } = require('../validators');
const { tagCreateValidator } = require('../validators/tag');
const { requireSignIn, adminMiddleware } = require('../controllers/auth');
const { create, list, read, remove } = require('../controllers/tag');


router.post('/tag', tagCreateValidator, runValidation, requireSignIn, adminMiddleware, create);
router.get('/tags', list);
router.get('/tag/:slug', read);
router.delete('/tag/:slug', requireSignIn, adminMiddleware, remove);

module.exports = router;
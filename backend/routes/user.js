const express = require('express');
const router = express.Router();
const { requireSignIn, authMiddleware, adminMiddleware } = require('../controllers/auth');
const { publicProfile } = require('../controllers/user')
const { read } = require('../controllers/user');

router.get('/profile', requireSignIn, authMiddleware, read);
router.get('/user/:username', publicProfile);

module.exports = router;
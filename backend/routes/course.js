const express = require('express');
const router = express.Router();
const { create } = require('../controllers/course');

const { requireSignIn, adminMiddleware } = require('../controllers/auth');

router.post('/course', requireSignIn, adminMiddleware, create);

module.exports = router;
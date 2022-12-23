const express = require('express');
const router = express.Router();
const { create, list, listAllCoursesCategoriesTags, read, remove, update } = require('../controllers/course');

const { requireSignIn, adminMiddleware } = require('../controllers/auth');

router.post('/course', requireSignIn, adminMiddleware, create);
router.get('/courses', list);
router.post('/courses-categories-tags', listAllCoursesCategoriesTags);
router.get('/course/:slug', read);
router.delete('/course/:slug', requireSignIn, adminMiddleware, remove);
router.put('/course/:slug', requireSignIn, adminMiddleware, update);


module.exports = router;
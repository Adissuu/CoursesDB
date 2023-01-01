const express = require('express');
const router = express.Router();
const { signup, signIn, signOut, requireSignIn } = require('../controllers/auth');

//validators
const { runValidation } = require('../validators');
const { userSignupValidator, userSignInValidator } = require('../validators/auth');


router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/signin', userSignInValidator, runValidation, signIn);
router.get('/signout', signOut);



//test
// router.get('/secret', requireSignIn, (req, res) => {
//     res.json({
//         user: req.auth
//     });
// });

module.exports = router;
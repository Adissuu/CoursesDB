const express = require('express');
const router = express.Router();
const { signup, signIn, signOut, requireSignIn, forgotPassword, resetPassword, googleLogin } = require('../controllers/auth');

//validators
const { runValidation } = require('../validators');
const { userSignupValidator, userSignInValidator, forgotPasswordValidator, resetPasswordValidator } = require('../validators/auth');


router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/signin', userSignInValidator, runValidation, signIn);
router.get('/signout', signOut);
router.put('/forgot-password', forgotPasswordValidator, runValidation, forgotPassword);
router.put('/reset-password', resetPasswordValidator, runValidation, resetPassword);



module.exports = router;
const User = require('../models/user');
const shortId = require('shortid');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const { errorHandler } = require('../helpers/dbErrorHandler');
const { expressjwt: expressJwt } = require('express-jwt');
const { OAuth2Client } = require('google-auth-library')
const sgMail = require('@sendgrid/mail'); // SENDGRID_API_KEY
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.signup = (req, res) => {
    User.findOne({ email: req.body.email }).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                error: "Email is taken"
            });
        }

        const { name, email, password } = req.body
        let username = shortId.generate()
        let profile = `${process.env.CLIENT_URL}/profile/${username}`

        let newUser = new User({ name, email, password, profile, username })
        newUser.save((err, success) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            // res.json({
            //     user: success
            // });
            res.json({
                message: 'Signup success! Please sign in'
            });
        })
    });
};

exports.signIn = (req, res) => {
    const { email, password } = req.body;
    // check if user exists
    User.findOne({ email }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User does not exist"
            });
        }
        // authenticate
        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: "Email and password don't match."
            });
        }
        // generate a token and send to client
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, { expiresIn: '1d' })
        const { _id, username, name, email, role } = user;
        return res.json({
            token, user: { _id, username, name, email, role }
        });
    });
};


exports.signOut = (req, res) => {
    res.clearCookie("token")
    res.json({
        message: "Signout success"
    });
};

exports.requireSignIn = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: "auth",
});

exports.authMiddleware = (req, res, next) => {
    const authUserID = req.auth._id
    User.findById({ _id: authUserID }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            })
        }
        req.profile = user
        next()
    });
}

exports.adminMiddleware = (req, res, next) => {
    const adminUserID = req.auth._id
    User.findById({ _id: adminUserID }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            })
        }
        // checks if admin
        if (user.role != 1) {
            return res.status(400).json({
                error: 'Admin resource. Access denied.'
            })
        }
        req.profile = user
        next()
    });
}

exports.forgotPassword = (req, res) => {
    const { email } = req.body;

    console.log({ email })
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({
                error: 'User with that email does not exist'
            });
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_RESET_PASSWORD, { expiresIn: '10m' });
        // email
        const emailData = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: `Password reset link`,
            html: `
            <p>Please use the following link to reset your password:</p>
            <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
            <hr />
            <p>This email may contain sensetive information</p>
            <p>https://coursesdb.com</p>
            `
        };

        return user.updateOne({ resetPasswordLink: token }, (err, success) => {
            if (err) {
                return res.json({ error: errorHandler(err) });
            } else {
                sgMail.send(emailData).then(sent => {
                    return res.json({
                        message: `Email has been sent to ${email}. Follow the instructions to reset your password. Link expires in 10 mins.`
                    });
                });
            }
        });
    });
};


exports.resetPassword = (req, res, next) => {
    const { resetPasswordLink, newPassword } = req.body;

    if (resetPasswordLink) {
        jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function (err, decoded) {
            if (err) {
                return res.status(401).json({
                    error: 'Expired link. Try again.'
                });
            }
            User.findOne({ resetPasswordLink }, (err, user) => {
                if (err || !user) {
                    return res.status(401).json({
                        error: 'Something went wrong.'
                    });
                }
                const updatedFields = {
                    password: newPassword,
                    resetPasswordLink: ''
                };

                user = _.extend(user, updatedFields);

                user.save((err, result) => {
                    if (err) {
                        return res.status(400).json({
                            error: errorHandler(err)
                        });
                    }
                    res.json({
                        message: `You can now login with your new password.`
                    });
                });
            });
        });
    }
};

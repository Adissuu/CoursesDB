const User = require('../models/user');
const shortId = require('shortid');
const jwt = require('jsonwebtoken');
const { expressjwt: expressJwt } = require('express-jwt');

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
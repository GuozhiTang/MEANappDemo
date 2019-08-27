// All of our users' routes
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
// Bring in our models
const User = require('../models/user');

// @route  POST users/register
// @desc   To register and add new users
// @access Private
router.post('/register', (req, res, next) => {
  //  res.send('REGISTER');
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });
  // adduser inside the model
  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({success: false, msg:'Failed to register user'});
    } else {
      res.json({success: true, msg:'User Registered!'});
    }
  });
});

// @route  POST users/authenticate
// @desc   To authenticate that whether the login user has same information with register one.
// @access Private
router.post('/authenticate', (req, res, next) => {
  // res.send('AUTHENTICATE');
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        // Need toJSON() or Error: Expected "payload" to be a plain object
        // https://github.com/bradtraversy/nodeauthapp/issues/3
        // const token = jwt.sign(user.toJSON(), config.secret, {
        //   expiresIn: 604800 // 1 week
        // });
        const token = jwt.sign({data: user}, config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({success: false, msg:'Wrong Password!'});
      }
    });
  })
});

// @route  GET users/profile
// @desc   one of the routes we will protect with our aithenticate with our token
// @access Private
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
// router.get('/profile', (req, res, next) => {
  // res.send('PROFILE');
  // res.json({msg: "success profile"});
  res.json({user: req.user});
});

// // Validate: if we want we can check that way to see the users if their token matches
// router.get('/validate', (req, res, next) => {
//   res.send('VALIDATE');
// });

module.exports = router;
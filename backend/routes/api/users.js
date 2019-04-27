const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const keys = require('../../config/keys');
// Load User Model
const User = require('../../models/User');
const validation = require('../../validation/validation');
const jwtVerify = require('../../auth/verifyJwt');
const isEmpty = require('../../validation/isEmpty');


router.get('/test', (req, res) => res.json({ msg: 'Users Route Works' }));

// @route          POST api/users/register
// @description    Register user
// @access         Public
router.post('/register', (req, res) => {
    // fetch frontend parameters for register and validate them
    const { errors, isValid } = validation.validateRegister(req.body);
  
    // Check Validation
     if (!isValid) {
       return res.status(400).json(errors);
     }
  
    User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.email = 'Email already exists';
        return res.status(400).json(errors);
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200', // Size
          r: 'pg', // Rating
          d: 'mm' // Default
        });
  
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password
        });
  
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    })
    .catch(err => console.log(err));
  });


// @route          POST api/users/login
// @description    Login User / Returning JWT Token
// @access         Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validation.validateLogin(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  // destruct info from request
  const { email, password } = req.body;

  // Find user by email
  User.findOne({ email })
  .then(user => {
    // Check for user
    if (!user) {
      // update proper errors property
      errors.email = 'User was not found';
      return res.status(404).json(errors);
    }

    let userpicture = '';
    if (!isEmpty(user.userpicture)) {
       userpicture =  user.userpicture;
    }

    
    // compare requested password with password from DB
    bcrypt.compare(password, user.password)
    .then(isMatched => {
      if (isMatched) {
        // define JWT payload
        const payload = { id: user.id, name: user.name, avatar: user.avatar, userpicture: userpicture }; 
        // sign JWT token 
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: "1h" },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  })
  .catch(err => res.status(400).json('failed to access database'));
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get('/current',jwtVerify.jwtExtractToken,(req, res) => {
    // pass the req.token (was updated in the jwtExtractToken middleware and verify the signature)
    jwt.verify(req.token, keys.secretOrKey, (err, jwtPayload) => {
      if (err) {
        res.sendStatus(403);
      } else {
        // get the current user document by id, the id is part of the payload, created in the sign jwt
        User.findById(jwtPayload.id)
        .then(user => {
          res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            userpicture: user.userpicture,
            avatar: user.avatar

          });
        })
        .catch(err => res.status(400).json(err));
      }
    })
  }
);

module.exports = router;
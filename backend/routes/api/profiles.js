const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtVerify = require('../../auth/verifyJwt');
const keys = require('../../config/keys');
const validation = require('../../validation/validation');
// Load User and Profile Models
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const cloudinary = require('cloudinary');
require('dotenv').config()

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
  })

// @route        POST api/profiles
// @description  Create/edit current user profile
// @access       Private
router.post('/', jwtVerify.jwtExtractToken,(req, res) => {
    jwt.verify(req.token, keys.secretOrKey, (err, jwtPayload) => {
        if (err) {
          res.sendStatus(403);
        } else {
            User.findById(jwtPayload.id)
            .then(user => {
                const { errors, isValid } = validation.validateProfile(req.body);
            // Check Validation
            if (!isValid) {
            // Return any errors with 400 status
            return res.status(400).json(errors);
            }
            // Get fields
            const profileFields = {};
            profileFields.user = user.id;
            if (req.body.handle) profileFields.handle = req.body.handle;
            if (req.body.picture) profileFields.picture = req.body.picture;
            if (req.body.location) profileFields.location = req.body.location;
            if (req.body.phonenumber) profileFields.phonenumber = req.body.phonenumber;
            if (req.body.contactemail) profileFields.contactemail = req.body.contactemail;
            if (req.body.bio) profileFields.bio = req.body.bio;
            if (req.body.status) profileFields.status = req.body.status;
            // split into array the weak subjects and the strong subjects
            if (req.body.strongat !== undefined) {
            profileFields.strongat = req.body.strongat.split(',');
            }
            if (req.body.weakat !== undefined) {
                profileFields.weakat = req.body.weakat.split(',');
            }
            // Social Media is an object in the mongo
            profileFields.social = {};
            if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
            if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
            if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
            if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
            if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

            Profile.findOne({ user: user.id }).then(profile => {
            if (profile) {
                // if profile found that means only need to update profile
                Profile.findOneAndUpdate(
                { user: user.id },
                { $set: profileFields },
                { new: true }
                ).then(profile => res.json(profile));
            } else { // create new profile


                // Check if handle exists
                Profile.findOne({ handle: profileFields.handle }).then(profile => {
                if (profile) {
                    errors.handle = 'That handle already exists';
                    res.status(400).json(errors);
                }

                // Save Profile
                new Profile(profileFields).save().then(profile => res.json(profile));
                });
            }
            });
        })   
        } 
    })
});

// @route          POST api/profiles/education
// @description    Add education to profile
// @access         Private
router.post('/education', jwtVerify.jwtExtractToken, (req, res) => {
    jwt.verify(req.token, keys.secretOrKey, (err, jwtPayload) => {
        if (err) {
          res.sendStatus(403);
        } else {
            User.findById(jwtPayload.id)
            .then(user => {
                const { errors, isValid } = validation.validateEducation(req.body);
                // Check Validation
                if (!isValid) {
                  // Return any errors with 400 status
                  return res.status(400).json(errors);
                }
                // Get the current user's profile and add new education (can have multiple educations, store in array)
                Profile.findOne({ user: user.id }).then(profile => {
                  const newEducation = {
                    school: req.body.school,
                    levelofeducation: req.body.levelofeducation,
                    fieldofstudy: req.body.fieldofstudy,
                    from: req.body.from,
                    to: req.body.to,
                    current: req.body.current,
                    description: req.body.description
                  };
                  // Add to education array
                  profile.education.unshift(newEducation);
            
                  profile.save().then(profile => res.json(profile));
                })
                .catch(err => res.status(400).json(user));
            })
            .catch(err => res.status(400).json('failed to access DB'))
        }
    })  
});

// @route          GET api/profiles
// @description    Get current users profile
// @access         Private
router.get('/', jwtVerify.jwtExtractToken, (req, res) => {
    jwt.verify(req.token, keys.secretOrKey, (err, jwtPayload) => {
        if (err) {
          res.sendStatus(403);
        } else {
            User.findById(jwtPayload.id)
            .then(user => {
                const errors = {};
                // Get current user profile  
                Profile.findOne({ user: user.id })
                    // this is similar to join, the outcome result will be profile.name, profile.avatar
                    .populate('user', ['name', 'avatar'])
                    .then(profile => {
                    if (!profile) {
                        errors.noprofile = 'This user does not have a profile';
                        return res.status(404).json(errors);
                    }
                    res.json(profile);
                    })
                    .catch(err => res.status(404).json(err));
            }).catch(err => res.status(400).json('failed to acess DB'));
        }
    })
});
  
// @route          GET api/profiles/all
// @description    Get all profiles
// @access         Public
router.get('/all', (req, res) => {
const errors = {};
// find all the documents and populate each one with the proper user.name and user.avatar
    Profile.find()
    .populate('user', ['name', 'avatar', 'userpicture'])
    .then(profiles => {
    if (!profiles) {
        errors.noprofile = 'There are no profiles';
        return res.status(404).json(errors);
    }
    // return users profiles
    res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: 'There are no profiles' }));
});
  
// @route          GET api/profiles/handle/:handle
// @description    Get profile by handle
// @access         Public  
router.get('/handle/:handle', (req, res) => {
const errors = {};

Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar', 'userpicture'])
    .then(profile => {
    if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
    }

    res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route        GET api/profiles/user/:user_id
// @description  Get profile by user ID
// @access       Public
router.get('/user/:user_id', (req, res) => {
const errors = {};

Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
    if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
    }
    res.json(profile);
    })
    .catch(err =>
    res.status(404).json({ profile: 'There is no profile for this user' })
    );
});

// @route          DELETE api/profiles/education/:edu_id
// @description    Delete education from profile
// @access         Private
router.delete('/education/:education_id', jwtVerify.jwtExtractToken, (req, res) => {
    jwt.verify(req.token, keys.secretOrKey, (err, jwtPayload) => {
        if (err) {
          res.sendStatus(403);
        } else {
            User.findById(jwtPayload.id)
            .then(user => {
                Profile.findOne({ user: user.id })
                .then(profile => {
                  // Get remove index
                  const removeIndex = profile.education
                    .map(item => item.id)
                    .indexOf(req.params.education_id);

                  // Splice out of array
                  profile.education.splice(removeIndex, 1);
          
                  // Save
                  profile.save().then(profile => res.json(profile));
                })
                .catch(err => res.status(404).json(err));        
            })
        }
    }
  );
});

// @route          DELETE api/profiles
// @description    Delete user and profile
// @access         Private
router.delete('/', jwtVerify.jwtExtractToken, (req, res) => {
    jwt.verify(req.token, keys.secretOrKey, (err, jwtPayload) => {
        if (err) {
          res.sendStatus(403);
        } else {
            User.findById(jwtPayload.id)
            .then(user => {
                Profile.findOneAndRemove({ user: user.id }).then(() => {
                    User.findOneAndRemove({ _id: user.id }).then(() =>
                        res.json({ success: true })
                    );
                });
            })
            .catch(err => res.status(404).json(err));   
        }
    })
});

// @route          POST api/profiles/image-upload
// @description    Upload user profile picture
// @access         Private
router.post('/image-upload',jwtVerify.jwtExtractToken, (req, res) => {
    jwt.verify(req.token, keys.secretOrKey, (err, jwtPayload) => {
    if (err) {
      res.sendStatus(403);
    } else {
        const values = Object.values(req.files)
   
        const promises = values.map(image => cloudinary.uploader.upload(image.path))
    
    Promise
      .all(promises)
      .then(results => {
        User.findById(jwtPayload.id)
                    .then(user => {
                    if (!user) {
                        return res.status(404).json('This user does not have a profile');
                    }
                    user.userpicture = results[0].secure_url;
                    user.save().then(user => res.json(user.userpicture));

        })
      })
      .catch((err) => res.status(400).json(err))     
    }
    })
});

// @route          DELETE api/profiles/image-upload
// @description    delete user profile picture
// @access         Private
router.delete('/image-upload', jwtVerify.jwtExtractToken, (req, res) => {
    jwt.verify(req.token, keys.secretOrKey, (err, jwtPayload) => {
        if (err) {
          res.sendStatus(403);
        } else {
            User.findById(jwtPayload.id)
            .then(user => {
                if (!user) {
                    return res.status(404).json('This user does not have a profile');
                }
            user.userpicture = '';
            user.save().then(user => res.json(user.userpicture));
            })
            .catch(err => res.status(404).json(' failed to acces DB'));
        }
    })
});

module.exports = router;
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtVerify = require('../../auth/verifyJwt');
const keys = require('../../config/keys');
const validation = require('../../validation/validation');
// Load Post and Profile models
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');


// @route       POST api/posts
// @description Create post
// @access      Private
router.post('/',jwtVerify.jwtExtractToken, (req, res) => {
    jwt.verify(req.token, keys.secretOrKey, (err, jwtPayload) => {
        if (err) {
          res.sendStatus(403);
        } else {
            const { errors, isValid } = validation.validatePost(req.body);
            // Check Validation
            if (!isValid) {
            // If any errors, send 400 with errors object
            return res.status(400).json(errors);
            }
            //link the post with user id
            const userId = jwtPayload.id;
            // create new post
            const newPost = new Post({
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: userId,
                userpicture: req.body.userpicture
              });
              // Save to database
              newPost.save().then(post => res.json(post));
        }
    })
});

  // @route          DELETE api/posts/:id
  // @description    Delete post
  // @access         Private
  router.delete('/:id', jwtVerify.jwtExtractToken ,(req, res) => {
    jwt.verify(req.token, keys.secretOrKey, (err, jwtPayload) => {
        if (err) {
          res.sendStatus(403);
        } else {
        Post.findById(req.params.id)
          .then(post => {
            // Check for post owner, jwtPayload.id holds the value of the current user id
            if (post.user.toString() !== jwtPayload.id) {
            return res
              .status(401)
              .json({ notauthorized: 'User not authorized' });
            } 
            // Delete
            post.remove().then(() => res.json({ success: true }));
          })
          .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
        }
    })
});

// @route          GET api/posts
// @description    Get posts
// @access         Public
router.get('/', (req, res) => {
    Post.find()
      .sort({ date: -1 })
      .then(posts => res.json(posts))
      .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
  });
  
  // @route   GET api/posts/:id
  // @description    Get post by id
  // @access  Public
  router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
      .then(post => {res.json(post)})
      .catch(err =>
        res.status(404).json({ nopostfound: 'No post found with that ID' })
      );
  });

  // @route          POST api/posts/like/:id
  // @description    Like post
  // @access         Private
  router.post('/:id', (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        post.prevcmt = req.body.numOfComments;
        post.save().then(post => res.json(post));
      })
      .catch(err =>
        res.status(404).json({ nopostfound: 'No post found with that ID' })
      );
  });

// @route          POST api/posts/like/:id
// @description    Like post
// @access         Private
router.post('/like/:id', jwtVerify.jwtExtractToken,(req, res) => {
    jwt.verify(req.token, keys.secretOrKey, (err, jwtPayload) => {
        if (err) {
          res.sendStatus(403);
        } else {
            const userId = jwtPayload.id;
            Post.findById(req.params.id)
            .then(post => {
                // users schema is connected by ref to likes field, like.user indicates the user._id
                // check if the user._id is already inside the likes array by scanning the likes array and filter if there's a match
                // between the user.id from jwt payload to the database likes array
                if (post.likes.filter(like => like.user.toString() === userId)
                    .length > 0) {
                return res
                    .status(400)
                    .json({ alreadyliked: 'User already liked this post' });
                }

                // Add user id to likes array
                post.likes.unshift({ user: userId });
                // Save to MongoDB
                post.save().then(post => res.json(post));
            })
            .catch(err => res.status(404).json({ postnotfound: 'Post Not found' }));
        }
    });
});

  
// @route          POST api/posts/unlike/:id
// @description    Unlike post
// @access         Private
router.post('/unlike/:id',jwtVerify.jwtExtractToken,(req, res) => {
    jwt.verify(req.token, keys.secretOrKey, (err, jwtPayload) => {
        if (err) {
          res.sendStatus(403);
        } else {
            const userId = jwtPayload.id;
            Post.findById(req.params.id)
            .then(post => {
                if (post.likes.filter(like => like.user.toString() === userId).length === 0) {
                    // this means user did not like the post yet, so can't unlike
                    return res.status(400).json( {notliked: 'You have not liked this post yet'});
                }     
                // else calculate the userId index inside the likes array and remove it
                // reutrn an array which includes all the users (user._id's) as a string and find the index of the wanted user to be removed
                const removeIndex = post.likes.map(like => like.user.toString()).indexOf(userId);
                // splice out of array
                post.likes.splice(removeIndex, 1);
                // save to mongoDB
                post.save().then(post => res.json(post));
            })
            .catch(err => res.status(404).json({ postnotfound: 'Post not found' }));
        }
    });
});

// @route          POST api/posts/comment/:id
// @description    Add comment to post
// @access         Private
router.post('/comment/:id', jwtVerify.jwtExtractToken, (req, res) => {
    jwt.verify(req.token, keys.secretOrKey, (err, jwtPayload) => {
        if (err) {
          res.sendStatus(403);
        } else {
            const { errors, isValid } = validation.validateComment(req.body);  
            // Check Validation
            if (!isValid) {
                // If any errors, send 400 with errors object
                return res.status(400).json(errors);
            }
            const userId = jwtPayload.id;
            Post.findById(req.params.id)
            .then(post => {
              const newComment = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: userId,
                userpicture: req.body.userpicture
              };
              // Add to comments array
              post.comments.unshift(newComment);
              // Increase number of comments related to the post
              post.newcmt++;
              // Save
              post.save().then(post => res.json(post));
            })
            .catch(err => res.status(404).json({ postnotfound: 'Post not found' }));
        }
    });
});
  
// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete('/comment/:id/:comment_id', jwtVerify.jwtExtractToken, (req, res) => {
    jwt.verify(req.token, keys.secretOrKey, (err, jwtPayload) => {
        if (err) {
          res.sendStatus(403);
        } else {
            // Get the post
            Post.findById(req.params.id)
            .then(post => {
                // Check to see if comment exists
                if (
                post.comments.filter(
                    comment => comment._id.toString() === req.params.comment_id
                ).length === 0
                ) {
                return res
                    .status(404)
                    .json({ commentnotexists: 'Comment does not exist' });
                }
            
                // Get remove index
                const removeIndex = post.comments
                .map(item => item._id.toString())
                .indexOf(req.params.comment_id);
                // Dec the comments number associated with this post
                post.newcmt--;
                // Splice comment out of array
                post.comments.splice(removeIndex, 1);
                // Save to MongoDB
                post.save().then(post => res.json(post));
            })
            .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
        }
    });
});

module.exports = router;
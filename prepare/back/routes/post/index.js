const express = require('express');
const router = express.Router();
const ctrl = require('./post.ctrl');
const { isLoggedIn } = require('../middlewares');

router.post('/', isLoggedIn, ctrl.createPost);
router.delete('/:postId', isLoggedIn, ctrl.deletePost);
router.post('/:postId/comment', isLoggedIn, ctrl.createComment);
router.patch('/:postId/like', isLoggedIn, ctrl.likePost);
router.delete('/:postId/like', isLoggedIn, ctrl.unlikePost);

module.exports = router;

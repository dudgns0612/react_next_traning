const express = require('express');
const router = express.Router();
const ctrl = require('./post.ctrl');
const { isLoggedIn } = require('../middlewares');

router.post('/', isLoggedIn, ctrl.createPost);
router.post('/:postId/comment', isLoggedIn, ctrl.addComment);
router.delete('/', isLoggedIn, ctrl.deletePost);

module.exports = router;

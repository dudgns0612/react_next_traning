const express = require('express');
const router = express.Router();
const ctrl = require('./post.ctrl');
const { isLoggedIn } = require('../middlewares');

router.post('/', isLoggedIn, ctrl.getPosts);
router.post('/:postId/comment', isLoggedIn, ctrl.addComment);

module.exports = router;

const express = require('express');
const router = express.Router();
const ctrl = require('./post.ctrl');

router.get('/', ctrl.getPosts);

module.exports = router;

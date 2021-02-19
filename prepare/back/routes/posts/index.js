const express = require('express');
const router = express.Router();
const ctrl = require('./posts.ctrl');

router.get('/', ctrl.getPosts);

module.exports = router;

const express = require('express');
const router = express.Router();
const ctrl = require('./user.ctrl');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');

router.post('/', isNotLoggedIn, ctrl.createUser);
router.post('/login', isNotLoggedIn, ctrl.logInUser);
router.post('/logout', isLoggedIn, ctrl.logOutUser);

module.exports = router;

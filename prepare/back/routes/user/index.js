const express = require('express');
const router = express.Router();
const ctrl = require('./user.ctrl');

router.post('/', ctrl.createUser);
router.post('/login', ctrl.logInUser);
router.post('/logout', ctrl.logOutUser);

module.exports = router;

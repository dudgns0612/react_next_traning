const express = require('express');
const router = express.Router();
const ctrl = require('./user.ctrl');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');

router.post('/', isNotLoggedIn, ctrl.createUser);
router.patch('/nickname', isLoggedIn, ctrl.updateUserNickname);
router.post('/login', isNotLoggedIn, ctrl.logInUser);
router.post('/logout', isLoggedIn, ctrl.logOutUser);
router.get('/', isLoggedIn, ctrl.geMyInfotUser);
router.get('/:userId', isLoggedIn, ctrl.getUser);
router.get('/followers', isLoggedIn, ctrl.getFollowers);
router.get('/followings', isLoggedIn, ctrl.getFollowings);
router.patch('/:userId/follow', isLoggedIn, ctrl.userFollow);
router.delete('/:userId/follow', isLoggedIn, ctrl.userUnfollow);
router.delete('/follower/:userId', isLoggedIn, ctrl.deleteFollower);
module.exports = router;

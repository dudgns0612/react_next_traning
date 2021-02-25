const { User, Post } = require('../../models');
const bcrypt = require('bcrypt');
const passport = require('passport');

// 유저 등록
const createUser = async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send('이미 사용중인 아이디입니다.');
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 11);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.status(201).send('ok');
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

// 닉네임 수정
const updateUserNickname = async (req, res, next) => {
  try {
    User.update(
      {
        nickname: req.body.nickname,
      },
      {
        where: { id: req.user.id },
      }
    );

    res.status(200).json({ nickname: req.body.nickname });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 유저 로그인
const logInUser = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }

    if (info) {
      return res.status(401).send(info.reason);
    }

    return req.login(user, async (logInErr) => {
      if (logInErr) {
        console.error(logInErr);
        return next(logInErr);
      }

      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: { exclude: ['passwrod'] },
        include: [
          {
            model: Post,
          },
          {
            model: User,
            as: 'Followings',
          },
          {
            model: User,
            as: 'Followers',
          },
        ],
      });
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
};

// 사용자 조회
const getUser = async (req, res, next) => {
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: { exclude: ['passwrod'] },
        include: [
          {
            model: Post,
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followings',
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followers',
            attributes: ['id'],
          },
        ],
      });
      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json();
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 유저 로그아웃
const logOutUser = (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('ok');
};

// 유저 팔로워 조회
const getFollowers = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
    });

    const followers = await user.getFollowers();
    res.status(200).json(followers);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 유저 팔로잉 조회
const getFollowings = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
    });

    const followings = await user.getFollowings();
    res.status(200).json(followings);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 유저 팔로우
const userFollow = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.userId },
    });

    if (!user) {
      res.status(403).send('존재하지 않는 사람을 팔로우 할 수 없습니다.');
    }
    await user.addFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId) });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 유저 팔로워 삭제
const deleteFollower = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.userId },
    });

    if (!user) {
      res.status(403).send('존재하지 않는 팔로워입니다.');
    }
    await user.removeFollowings(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId) });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 유저 팔로우 해제
const userUnfollow = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.userId },
    });

    if (!user) {
      res.status(403).send('존재하지 않는 사람을 언팔로우 할 수 없습니다.');
    }
    await user.removeFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId) });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  createUser,
  updateUserNickname,
  logInUser,
  logOutUser,
  getUser,
  getFollowers,
  getFollowings,
  userFollow,
  userUnfollow,
  deleteFollower,
};

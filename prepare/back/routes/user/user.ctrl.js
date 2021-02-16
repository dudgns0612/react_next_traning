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

// 유저 로그아웃
const logOutUser = (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('ok');
};

module.exports = {
  createUser,
  logInUser,
  logOutUser,
};

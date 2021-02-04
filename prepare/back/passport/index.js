const passport = require('passport');
const local = require('./local');
const { User } = require('../models');

module.exports = () => {
  // 로그인 시 사용자 id만 저장
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // 로그인 후 다른 요청 시 사용자 id로 사용자 정보 조회 후 유저정보를 담아서 보냄
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } });
      done(null, user);
    } catch (error) {
      console.error(error);
      done(error);
    }
  });
  local();
};

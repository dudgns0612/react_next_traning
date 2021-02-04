const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');

const db = require('./models');
const passportConfig = require('./passport');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');

const app = express();
dotenv.config();

// cross origin 설정
app.use(
  cors({
    origin: '*',
    credentials: false,
  })
);

// req 데이터 포맷 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 쿠키 세션 미들웨어 설정
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());

db.sequelize
  .sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);

// passport 설정
passportConfig();

app.use('/post', postRouter);
app.use('/user', userRouter);

app.listen(3065, () => {
  console.log('서버 구동중...');
});

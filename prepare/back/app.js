const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');

const db = require('./models');
const passportConfig = require('./passport');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');

const app = express();

dotenv.config();

// cross origin 설정
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true, // cros 자격증명 적용
  })
);

// express에서 정적파일 제공
app.use('/images', express.static(path.join(__dirname, 'uploads')));
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
app.use(morgan('dev'));

db.sequelize
  .sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);

// passport 설정
passportConfig();

app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/posts', postsRouter);

// 에러처리 미들웨어는 기본적으로 처리되어있다.
// 에러페이지를 따로 띄워주거나 할때 생성
// app.use((err, req, res, next)=>{
// })

app.listen(3065, () => {
  console.log('서버 구동중...');
});

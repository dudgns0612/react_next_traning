const express = require('express');
const db = require('./models');
const app = express();
const post = require('./routes/post');

db.sequelize
  .sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);

app.use('/post', post);

app.listen(3065, () => {
  console.log('서버 구동중...');
});

const express = require('express');
const router = express.Router();
const ctrl = require('./post.ctrl');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { isLoggedIn } = require('../middlewares');

try {
  fs.accessSync('/uploads');
} catch (error) {
  if (!fs.existsSync('uploads')) {
    console.log('uploads 파일이 존재하지 않아 생성합니다.');
    fs.mkdirSync('uploads');
  }
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname); // 확장자 (.png)
      const basename = path.basename(file.originalname, ext); // 파일명
      done(null, basename + '_' + new Date().getTime() + ext); // 파일명 + 현재시간 + 확장자
    },
    limits: { fileSize: 20 * 1024 * 1024 },
  }),
});

router.post('/', isLoggedIn, upload.none(), ctrl.createPost);
router.delete('/:postId', isLoggedIn, ctrl.deletePost);
router.post('/:postId/comment', isLoggedIn, ctrl.createComment);
router.patch('/:postId/like', isLoggedIn, ctrl.likePost);
router.delete('/:postId/like', isLoggedIn, ctrl.unlikePost);
// upload array 복수이미지, single 단일이미지, none 텍스트
router.post('/images', isLoggedIn, upload.array('image'), ctrl.uploadImages);
router.post('/:postId/retweet', isLoggedIn, ctrl.createRetweet);

module.exports = router;

const { Post, Comment } = require('../../models');

const getPosts = async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });

    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const addComment = async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.postId,
      },
    });

    // 존재하지 않는 게시글 인경우
    if (!post) {
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }

    const comment = await Comment.create({
      content: req.body.content,
      PostId: req.params.postId,
      UserId: req.user.id,
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

module.exports = {
  getPosts,
  addComment,
};

const { Post, Comment, User, Image, Hashtag } = require('../../models');

// 게시글 등록
const createPost = async (req, res, next) => {
  try {
    const hashtags = req.body.content.match(/#[^\s#]+/g);
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });

    // 해쉬태그 등록
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) => Hashtag.findOrCreate({ where: { name: tag.slice(1).toLowerCase() } }))
      );
      await post.addHashtags(result.map((hashtag) => hashtag[0]));
    }

    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        const images = await Promise.all(
          req.body.image.map((image) =>
            Image.create({
              src: image,
            })
          )
        );

        await post.addImages(images);
      } else {
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);
      }
    }
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        { model: Image },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
          ],
        },
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
        {
          model: User,
          as: 'Likers',
          attributes: ['id'],
        },
      ],
    });

    res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

// 게시글 상세 조회
const getPost = async (req, res, next) => {
  try {
    const fullPost = await Post.findOne({
      where: { id: req.params.postId },
      include: [
        {
          model: Post,
          as: 'Retweet',
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
            {
              model: Image,
            },
          ],
        },
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
        {
          model: User,
          as: 'Likers',
          attributes: ['id', 'nickname'],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
          ],
        },
      ],
    });

    if (!fullPost) {
      res.status(404).send('존재하지 않는 게시글입니다.');
    } else {
      res.status(200).json(fullPost);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// 게시글 삭제
const deletePost = async (req, res, next) => {
  try {
    await Post.destroy({
      where: {
        id: req.params.postId,
        UserId: req.user.id,
      },
    });
    res.json({ PostId: parseInt(req.params.postId) });
  } catch (error) {
    console.error(error);
    next(error);
  }
  res.json({ id: 1 });
};

// 댓글 등록
const createComment = async (req, res, next) => {
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
      PostId: parseInt(req.params.postId),
      UserId: req.user.id,
    });

    const fullComment = await Comment.findOne({
      where: {
        id: comment.id,
      },
      include: [
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
      ],
    });

    res.status(201).json(fullComment);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

// 좋아요 등록
const likePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.postId,
      },
    });

    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }

    // 게시글 좋아요 사용자 추가
    await post.addLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 좋아요 삭제
const unlikePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.postId,
      },
    });

    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }

    // 게시글 좋아요 사용자 삭제
    await post.removeLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 리트윗
const createRetweet = async (req, res, next) => {
  try {
    console.log('포스트 아이디', req.params.postId);
    const post = await Post.findOne({
      where: { id: req.params.postId },
      include: [
        {
          model: Post,
          as: 'Retweet',
        },
      ],
    });

    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }

    if (req.user.id === post.UserId || (post.Retweet && post.Retweet.UserId === req.user.id)) {
      return res.status(403).send('자신의 글은 리트윗 할 수 없습니다.');
    }

    const retweetTargetId = post.RetweetId || post.id;

    const retweetPost = await Post.findOne({
      where: {
        UserId: req.user.id,
        RetweetId: retweetTargetId,
      },
    });

    if (retweetPost) {
      return res.status(403).send('이미 게시글을 리트윗했습니다.');
    }

    const retweet = await Post.create({
      UserId: req.user.id,
      RetweetId: retweetTargetId,
      content: 'retweet',
    });

    const retweetWithPrevPost = await Post.findOne({
      where: { id: retweet.id },
      include: [
        {
          model: Post,
          as: 'Retweet',
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
            {
              model: Image,
            },
          ],
        },
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
        {
          model: User,
          as: 'Likers',
          attributes: ['id', 'nickname'],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
          ],
        },
      ],
    });

    res.status(201).json(retweetWithPrevPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const uploadImages = async (req, res, next) => {
  console.log(req.files);
  res.json(req.files.map((file) => file.filename));
};

module.exports = {
  createPost,
  getPost,
  createComment,
  deletePost,
  likePost,
  unlikePost,
  uploadImages,
  createRetweet,
};

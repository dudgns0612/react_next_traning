module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    }
  );

  Post.associate = (db) => {
    // 시퀄라이즈 제공 add, get, set
    db.Post.belongsTo(db.User); // post.addUser
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' }); // post.addHashtags
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' }); // post.addLikers
    db.Post.hasMany(db.Comment); // post.addComments
    db.Post.hasMany(db.Image);
    db.Post.belongsTo(db.Post, { as: 'Retweet' }); // post.addRetweets
  };
  return Post;
};

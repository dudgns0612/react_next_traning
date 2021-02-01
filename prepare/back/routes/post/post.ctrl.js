const getPosts = (req, res) => {
  res.json([
    { id: 1, content: '게시글1' },
    { id: 1, content: '게시글2' }
  ]);
};

module.exports = {
  getPosts
};

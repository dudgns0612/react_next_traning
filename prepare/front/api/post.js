import axios from 'axios';

const loadPostAPI = (data) => axios.get(`/post/${data}`);
const loadPostsAPI = (data) => axios.get(`/posts?lastId=${data || 0}`);
const addPostAPI = (data) => axios.post('/post', data);
const removePostAPI = (data) => axios.delete(`/post/${data}`);
const addCommentAPI = (data) => axios.post(`/post/${data.postId}/comment`, data);
const likePostAPI = (data) => axios.patch(`/post/${data}/like`);
const unlikePostAPI = (data) => axios.delete(`/post/${data}/like`);
const uploadImagesAPI = (data) => axios.post('/post/images', data);
const retweetAPI = (data) => axios.post(`/post/${data}/retweet`);

export default {
  loadPostAPI,
  loadPostsAPI,
  addPostAPI,
  removePostAPI,
  addCommentAPI,
  likePostAPI,
  unlikePostAPI,
  uploadImagesAPI,
  retweetAPI,
};

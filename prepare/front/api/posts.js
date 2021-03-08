import axios from 'axios';

const loadPostsAPI = (data) => axios.get(`/posts?lastId=${data || 0}`);

export default {
  loadPostsAPI,
};

import axios from 'axios';

const loadPostsAPI = (data) => axios.get('/posts', data);

export default {
  loadPostsAPI,
};

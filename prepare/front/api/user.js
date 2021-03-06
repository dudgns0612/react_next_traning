import axios from 'axios';

const singUpAPI = (data) => axios.post('/user', data);
const logInAPI = (data) => axios.post('/user/login', data);
const logOutAPI = () => axios.post('/user/logout');
const loadMyInfoAPI = () => axios.get('/user');
const loadUserAPI = (data) => axios.get(`/user/${data}`);
const changeUserNicknameAPI = (data) => axios.patch('/user/nickname', { nickname: data });
const loadFollowersAPI = () => axios.get('/user/followers');
const loadFollowingsAPI = () => axios.get('/user/followings');
const followAPI = (data) => axios.patch(`/user/${data}/follow`);
const unfollowAPI = (data) => axios.delete(`/user/${data}/follow`);
const removeFollowerAPI = (data) => axios.delete(`/user/follower/${data}`);

export default {
  singUpAPI,
  logInAPI,
  logOutAPI,
  loadMyInfoAPI,
  loadUserAPI,
  changeUserNicknameAPI,
  loadFollowersAPI,
  loadFollowingsAPI,
  followAPI,
  unfollowAPI,
  removeFollowerAPI,
};

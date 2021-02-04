import axios from 'axios';

const singUpAPI = (data) => axios.post('/user', data);
const logInAPI = (data) => axios.post('/user/login', data);
const logOutAPI = () => axios.post('/user/logout');

export default {
  singUpAPI,
  logInAPI,
  logOutAPI,
};

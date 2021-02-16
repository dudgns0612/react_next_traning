import axios from 'axios';

const addPostAPI = (data) => axios.post('/post', { content: data });
const addCommentAPI = (data) => axios.post(`/post/${data.postId}/comment`, data);

export default { addPostAPI, addCommentAPI };

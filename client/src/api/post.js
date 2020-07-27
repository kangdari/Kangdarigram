import axios from 'axios';

// post 작성
export const uploadPost = (formData, config) => axios.post('/api/post/upload', formData, config);

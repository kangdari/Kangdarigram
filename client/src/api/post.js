import axios from 'axios';

const POST_SERVER = '/api/post';

// 이미지 업로드
export const uploadImage = (formData, config) =>
  axios.post(`${POST_SERVER}/image`, formData, config);

// 포스트 작성
export const uploadPost = (data) => axios.post(`${POST_SERVER}/upload`, data);

// 포스트 조회
export const loadPost = (body) => axios.post(`${POST_SERVER}/posts`, body);
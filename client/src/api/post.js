import api from "../utils/apiUtils";

const POST_SERVER = "/api/post";

// 이미지 업로드
export const uploadImage = (formData, config) =>
  api.post(`${POST_SERVER}/image`, formData, config);

// 자신이 작성한 포스트 조회
export const loadPost = (body) =>
  api.post(`${POST_SERVER}/get-profile-post-list`, body);

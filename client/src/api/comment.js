import axios from "axios";

const COMMENT_SERVER = "/api/comment";

export const saveComment = (data) =>
  axios.post(`${COMMENT_SERVER}/save-comment`, data);

export const getComment = (data) =>
  axios.post(`${COMMENT_SERVER}/load-comment`, data);

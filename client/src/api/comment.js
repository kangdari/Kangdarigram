import axios from "axios";

const COMMENT_SERVER = "/api/comment";

export const saveComment = (data) =>
  axios.post(`${COMMENT_SERVER}/saveComment`, data);

export const getComment = (data) =>
  axios.post(`${COMMENT_SERVER}/getComment`, data);
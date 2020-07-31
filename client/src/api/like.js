import axios from "axios";

const LIKE_SERVER = "/api/like";

export const saveLike = (data) => axios.post(`${LIKE_SERVER}/saveLike`, data);

export const unSaveLike = (data) =>
  axios.post(`${LIKE_SERVER}/unSaveLike`, data);

export const getLike = (data) => axios.post(`${LIKE_SERVER}/getLike`, data);

export const getTotalLikeCount = (data) =>
  axios.post(`${LIKE_SERVER}/getLikecount`, data);

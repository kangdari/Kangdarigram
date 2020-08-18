import api from "../utils/apiUtils";
import {
  GET_LIKE_COUNT_SUCCESS,
  GET_LIKE_COUNT_FAILURE,
  LIKE_SUCCESS,
  LIKE_FAILURE,
  UNLIKE_SUCCESS,
  UNLIKE_FAILURE,
} from "./types";

// post 좋아요 개수 체크
export const getLikeCount = (data) => async (dispatch) => {
  try {
    const result = await api.post("/api/like/get-like-count", data);
    dispatch({
      type: GET_LIKE_COUNT_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    dispatch({
      type: GET_LIKE_COUNT_FAILURE,
      payload: err,
    });
  }
};

export const like = (data) => async (dispatch) => {
  try {
    const result = await api.post("/api/like/like", data);
    dispatch({
      type: LIKE_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    dispatch({
      type: LIKE_FAILURE,
      payload: err,
    });
  }
};

export const unLike = (data) => async (dispatch) => {
  try {
    const result = await api.post("/api/like/unlike", data);
    dispatch({
      type: UNLIKE_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    dispatch({
      type: UNLIKE_FAILURE,
      payload: err,
    });
  }
};

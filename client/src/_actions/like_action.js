import axios from "axios";
import { GET_LIKE_COUNT_SUCCESS, GET_LIKE_COUNT_FAILURE } from "./types";

// thunk
// 좋아요 개수 체크
export const getLikeCount = (data) => async (dispatch) => {
  try {
    const result = await axios.post("/api/like/getLikeCount", data);
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
  } catch (err) {}
};

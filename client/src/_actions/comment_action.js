import axios from "axios";
import {
  SAVE_COMMENT_FAILURE,
  SAVE_COMMENT_SUCCESS,
  LOAD_COMMENT_SUCCESS,
  LOAD_COMMENT_FAILURE,
} from "./types";

// 댓글 작성
export const saveComment = (data) => async (dispatch) => {
  try {
    const result = await axios.post("/api/comment/save-comment", data);

    dispatch({
      type: SAVE_COMMENT_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    dispatch({
      type: SAVE_COMMENT_FAILURE,
      playload: err,
    });
  }
};
// 댓글 조회
export const loadComment = (data) => async (dispatch) => {
  try {
    const result = await axios.post("/api/comment/load-comment", data);
    dispatch({
      type: LOAD_COMMENT_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    dispatch({
      type: LOAD_COMMENT_FAILURE,
      playload: err,
    });
  }
};

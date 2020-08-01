import axios from "axios";
import {
  GET_POST_LIST_FAILURE,
  GET_POST_LIST_SUCCESS,
  GET_SAVED_POST_LIST_FAILURE,
  GET_SAVED_POST_LIST_SUCCESS,
} from "./types";

export const getPostList = (data) => async (dispatch) => {
  try {
    const result = await axios.post("/api/post/posts", data);
    dispatch({
      type: GET_POST_LIST_SUCCESS,
      payload: result.data.postInfo,
    });
  } catch (err) {
    dispatch({
      type: GET_POST_LIST_FAILURE,
      payload: err,
    });
  }
};

export const getSavedPostList = (data) => async (dispatch) => {
  try {
    const result = await axios.post("/api/post/loadSavedPosts", data);
    dispatch({
      type: GET_SAVED_POST_LIST_SUCCESS,
      payload: result.data.savedPostInfo,
    });
  } catch (err) {
    dispatch({
      type: GET_SAVED_POST_LIST_FAILURE,
      payload: err,
    });
  }
};

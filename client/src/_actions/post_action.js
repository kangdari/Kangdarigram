import axios from "axios";
import {
  GET_POST_LIST_FAILURE,
  GET_POST_LIST_SUCCESS,
  GET_SAVED_POST_LIST_FAILURE,
  GET_SAVED_POST_LIST_SUCCESS,
} from "./types";

import { startLoading, finishLoading } from "./loading_action";

export const getPostList = (data) => async (dispatch) => {
  dispatch(startLoading("GET_POST_LIST"));
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
  dispatch(finishLoading("GET_POST_LIST"));
};

export const getSavedPostList = (data) => async (dispatch) => {
  dispatch(startLoading("GET_SAVED_POST_LIST"));
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
  dispatch(finishLoading("GET_SAVED_POST_LIST"));
};

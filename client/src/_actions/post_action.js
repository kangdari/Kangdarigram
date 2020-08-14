import axios from "axios";
import {
  GET_PROFILE_POST_LIST_SUCCESS,
  GET_PROFILE_POST_LIST_FAILURE,
  GET_SAVED_POST_LIST_FAILURE,
  GET_SAVED_POST_LIST_SUCCESS,
  LOAD_POST_LIST_SUCCESS,
  LOAD_POST_LIST_FAILURE,
  LOAD_TAG_POST_LIST_FAILURE,
  LOAD_TAG_POST_LIST_SUCCESS,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
} from "./types";

import { startLoading, finishLoading } from "./loading_action";

export const loadPostList = (data) => async (dispatch) => {
  dispatch(startLoading("LOAD_POST_LIST"));
  try {
    const result = await axios.post("/api/post/load-post-list", data);
    dispatch({
      type: LOAD_POST_LIST_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    dispatch({
      type: LOAD_POST_LIST_FAILURE,
      payload: err,
    });
  }
  dispatch(finishLoading("LOAD_POST_LIST"));
};

export const getProfilePostList = (data) => async (dispatch) => {
  dispatch(startLoading("GET_PROFILE_POST_LIST"));
  try {
    const result = await axios.post("/api/post/get-profile-post-list", data);
    dispatch({
      type: GET_PROFILE_POST_LIST_SUCCESS,
      payload: result.data.postInfo,
    });
  } catch (err) {
    dispatch({
      type: GET_PROFILE_POST_LIST_FAILURE,
      payload: err,
    });
  }
  dispatch(finishLoading("GET_PROFILE_POST_LIST"));
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

export const loadTagPostList = (tag) => async (dispatch) => {
  dispatch(startLoading(LOAD_TAG_POST_LIST_SUCCESS));
  try {
    const result = await axios.get(`/api/post/load-tag-post-list?tag=${tag}`);
    dispatch({
      type: LOAD_TAG_POST_LIST_SUCCESS,
      payload: result.data.tagPostInfo,
    });
  } catch (err) {
    dispatch({
      type: LOAD_TAG_POST_LIST_FAILURE,
      payload: err,
    });
  }
  dispatch(finishLoading(LOAD_TAG_POST_LIST_FAILURE));
};

export const deletePost = (postId) => async (dispatch) => {
  const result = await axios.delete(`/api/post/delete-post?postId=${postId}`);
  try {
    dispatch({
      type: DELETE_POST_SUCCESS,
      payload: result.data.postId,
    });
  } catch (err) {
    dispatch({
      type: DELETE_POST_FAILURE,
      payload: err,
    });
  }
};

import axios from "axios";
import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  AUTH_CHECK,
  LOGOUT,
  LOAD_USER_LIST_SUCCESS,
  LOAD_USER_LIST_FAILURE,
  UPLOAD_USER_IMAGE_SUCCESS,
  UPLOAD_USER_IMAGE_FAILURE,
} from "./types";

export const loginUser = (dataToSubmit) => async (dispatch) => {
  dispatch({ type: LOGIN_USER });

  try {
    const res = await axios.post("/api/users/login", dataToSubmit);
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOGIN_USER_FAILURE,
      payload: err,
    });
  }
};

export const registerUser = (dataToSubmit) => async (dispatch) => {
  dispatch({ type: REGISTER_USER });
  try {
    const res = await axios.post("/api/users/register", dataToSubmit);
    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: REGISTER_USER_FAILURE,
      payload: err,
    });
  }
};

// logout action 발생 시
// auth, user state 초기화
export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
  await axios.get(`api/users/logout`);
};

export const authCheck = () => {
  const request = axios.get(`/api/users/auth`).then((res) => res.data);
  return {
    type: AUTH_CHECK,
    payload: request,
  };
};

export const loadUserList = () => async (dispatch) => {
  try {
    const result = await axios.post("/api/users/load-user-list");
    dispatch({
      type: LOAD_USER_LIST_SUCCESS,
      payload: result.data.userList,
    });
  } catch (err) {
    dispatch({
      type: LOAD_USER_LIST_FAILURE,
      payload: err,
    });
  }
};

export const uploadUserImg = (data, userId) => async (dispatch) => {
  try {
    const result = await axios.post(
      `/api/users/upload/user-image?userId=${userId}`,
      data,
    );
    dispatch({
      type: UPLOAD_USER_IMAGE_SUCCESS,
      payload: result.data.userInfo.image,
    });
  } catch (err) {
    dispatch({
      type: UPLOAD_USER_IMAGE_FAILURE,
      payload: err,
    });
  }
};

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

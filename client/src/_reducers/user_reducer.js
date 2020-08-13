import { handleActions } from "redux-actions";
import {
  // LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  LOGOUT,
  AUTH_CHECK,
  LOAD_USER_LIST_FAILURE,
  LOAD_USER_LIST_SUCCESS,
  UPLOAD_USER_IMAGE_SUCCESS,
  UPLOAD_USER_IMAGE_FAILURE,
} from "../_actions/types";

const initialState = {
  userError: "", // 에러
  login: "",
  register: "",
  userData: "", // 현재 로그인 유저
  userList: [], // 전체 유저 정보
};

const user = handleActions(
  {
    [LOGIN_USER_SUCCESS]: (state, action) => ({
      ...state,
      login: action.payload,
      userError: "",
    }),
    [LOGIN_USER_FAILURE]: (state, action) => ({
      ...state,
      login: "",
      userError: action.payload,
    }),
    [REGISTER_USER_SUCCESS]: (state, { payload }) => ({
      ...state,
      register: payload,
      userError: "",
    }),
    [REGISTER_USER_FAILURE]: (state, action) => ({
      ...state,
      register: "",
      userError: action.payload,
    }),
    [LOGOUT]: (state) => ({
      ...state,
      login: "",
      userData: "",
    }),
    [AUTH_CHECK]: (state, action) => ({
      ...state,
      userData: action.payload,
    }),
    [LOAD_USER_LIST_SUCCESS]: (state, action) => ({
      ...state,
      userList: action.payload,
    }),
    [LOAD_USER_LIST_FAILURE]: (state, action) => ({
      ...state,
      userError: action.payload,
    }),
    [UPLOAD_USER_IMAGE_SUCCESS]: (state, action) => ({
      ...state,
      userData: {
        ...state.userData,
        image: action.payload,
      },
    }),
    [UPLOAD_USER_IMAGE_FAILURE]: (state, action) => ({
      ...state,
      userError: action.payload,
    }),
  },
  initialState,
);

export default user;

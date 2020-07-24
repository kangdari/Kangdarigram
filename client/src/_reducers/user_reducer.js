import { handleActions } from 'redux-actions';
import {
  // LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILUER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILUER,
  LOGOUT,
  AUTH_CHECK,
} from '../_actions/types';

const initialState = {
  userError: '', // 에러
  login: '',
  register: '',
  userData: '',
};

const user = handleActions(
  {
    [LOGIN_USER_SUCCESS]: (state, action) => ({
      ...state,
      login: action.payload,
      userError: '',
    }),
    [LOGIN_USER_FAILUER]: (state, action) => ({
      ...state,
      login: '',
      userError: action.payload,
    }),
    [REGISTER_USER_SUCCESS]: (state, { payload }) => ({
      ...state,
      register: payload,
      userError: '',
    }),
    [REGISTER_USER_FAILUER]: (state, action) => ({
      ...state,
      register: '',
      userError: action.payload,
    }),
    [LOGOUT]: (state) => ({
      ...state,
      login: '',
      userData: '',
    }),
    [AUTH_CHECK]: (state, action) => ({
      ...state,
      userData: action.payload,
    }),
  },
  initialState
);

export default user;

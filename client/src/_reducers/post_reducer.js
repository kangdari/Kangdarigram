import { handleActions } from "redux-actions";
import {
  GET_POST_LIST_SUCCESS,
  GET_POST_LIST_FAILURE,
  GET_SAVED_POST_LIST_FAILURE,
  GET_SAVED_POST_LIST_SUCCESS,
  GET_LIKE_COUNT_SUCCESS,
  GET_LIKE_COUNT_FAILURE,
} from "../_actions/types";

const initialState = {
  posts: [],
  savedPosts: [],
  error: "",
};

const posts = handleActions(
  {
    [GET_POST_LIST_SUCCESS]: (state, action) => ({
      ...state,
      posts: action.payload,
    }),
    [GET_POST_LIST_FAILURE]: (state, action) => ({
      ...state,
      error: action.payload,
    }),
    [GET_SAVED_POST_LIST_SUCCESS]: (state, action) => ({
      ...state,
      savedPosts: action.payload,
    }),
    // posts: state.posts.map((post) => ({ ...post, ...aciton.payload })),

    [GET_SAVED_POST_LIST_FAILURE]: (state, action) => ({
      ...state,
      error: action.payload,
    }),
    // 각 post state에 likeCount Key, value 추가
    [GET_LIKE_COUNT_SUCCESS]: (state, action) => ({
      ...state,
      posts: state.posts.map((post) => {
        if (post._id === action.payload.postId) {
          return Object.assign({}, post, {
            likeCount: action.payload.likeCount,
          });
        }
        return post;
      }),
      // 객체 펼침 연산자 사용
      // posts: state.posts.map((post) => ({
      //   ...post,
      //   likeCount: action.payload.likeCount,
      // })),
    }),
    [GET_LIKE_COUNT_FAILURE]: (state, action) => ({
      ...state,
    }),
  },
  initialState,
);

export default posts;

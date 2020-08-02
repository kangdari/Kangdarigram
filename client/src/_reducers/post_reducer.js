import { handleActions } from "redux-actions";
import {
  GET_POST_LIST_SUCCESS,
  GET_POST_LIST_FAILURE,
  GET_SAVED_POST_LIST_FAILURE,
  GET_SAVED_POST_LIST_SUCCESS,
  GET_LIKE_COUNT_SUCCESS,
  GET_LIKE_COUNT_FAILURE,
  LIKE_SUCCESS,
  LIKE_FAILURE,
  UNLIKE_FAILURE,
  UNLIKE_SUCCESS,
} from "../_actions/types";

const initialState = {
  posts: [],
  savedPosts: [],
  error: "",
};

const posts = handleActions(
  {
    // 포스트 조회
    [GET_POST_LIST_SUCCESS]: (state, action) => ({
      ...state,
      posts: action.payload,
    }),
    [GET_POST_LIST_FAILURE]: (state, action) => ({
      ...state,
      error: action.payload,
    }),
    // 저장된 post 조회
    [GET_SAVED_POST_LIST_SUCCESS]: (state, action) => ({
      ...state,
      savedPosts: action.payload,
    }),
    [GET_SAVED_POST_LIST_FAILURE]: (state, action) => ({
      ...state,
      error: action.payload,
    }),

    // 각 포스트의 좋아요 개수 조회
    [GET_LIKE_COUNT_SUCCESS]: (state, action) => ({
      ...state,
      posts: state.posts.map((post) => {
        if (post._id === action.payload.postId) {
          return Object.assign({}, post, {
            like: action.payload.like,
          });
        }
        return post;
      }),
    }),

    [GET_LIKE_COUNT_FAILURE]: (state, action) => ({
      ...state,
      error: action.payload,
    }),

    // 좋아요
    [LIKE_SUCCESS]: (state, action) => ({
      ...state,
      // 좋아요를 누른 포스트를 찾아 likeInfo를 store에 저장
      posts: state.posts.map((post) => {
        if (post._id === action.payload.likeInfo.postId) {
          return Object.assign({}, post, {
            // 기존 like 배열과 합치기
            like: [...post.like, action.payload.likeInfo],
          });
        }
        return post;
      }),
    }),
    [LIKE_FAILURE]: (state, action) => ({
      ...state,
      error: action.payload,
    }),

    // 좋아요 취소
    [UNLIKE_SUCCESS]: (state, { payload }) => ({
      ...state,
      // 좋아요 취소를 누른 post를 store에서 찾고
      // 포스트의 like 배열에서 like._id 값이 일치하는 값만 제거
      posts: state.posts.map((post) => {
        if (post._id === payload.likeInfo.postId) {
          const filteredLike = post.like.filter(
            (like) => like._id !== payload.likeInfo._id,
          );
          // 객체 펼침 연산자 사용
          return { ...post, like: [...filteredLike] };
          // return Object.assign({}, post, {
          //   like: [...filteredLike],
          // });
        }
        return post;
      }),
    }),
    [UNLIKE_FAILURE]: (state, { payload }) => ({
      ...state,
      error: payload,
    }),
  },
  initialState,
);

export default posts;

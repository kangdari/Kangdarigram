import { handleActions } from "redux-actions";
import {
  LOAD_POST_LIST_SUCCESS,
  LOAD_POST_LIST_FAILURE,
  GET_PROFILE_POST_LIST_SUCCESS,
  GET_PROFILE_POST_LIST_FAILURE,
  GET_SAVED_POST_LIST_FAILURE,
  GET_SAVED_POST_LIST_SUCCESS,
  GET_LIKE_COUNT_SUCCESS,
  GET_LIKE_COUNT_FAILURE,
  LIKE_SUCCESS,
  LIKE_FAILURE,
  UNLIKE_FAILURE,
  UNLIKE_SUCCESS,
  SAVE_COMMENT_FAILURE,
  SAVE_COMMENT_SUCCESS,
  LOAD_COMMENT_FAILURE,
  LOAD_COMMENT_SUCCESS,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
} from "../_actions/types";

const initialState = {
  home_post_list: [],
  posts: [],
  savedPosts: [],
  error: "",
};

const posts = handleActions(
  {
    [LOAD_POST_LIST_SUCCESS]: (state, action) => ({
      ...state,
      home_post_list: action.payload.postInfo,
    }),
    [LOAD_POST_LIST_FAILURE]: (state, action) => ({
      ...state,
      error: action.payload,
    }),
    // 프로필 포스트 조회
    [GET_PROFILE_POST_LIST_SUCCESS]: (state, action) => ({
      ...state,
      posts: action.payload,
    }),
    [GET_PROFILE_POST_LIST_FAILURE]: (state, action) => ({
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
        const { type, postId } = action.payload;
        // console.log(action.payload.type);
        // if ( flag && post._id === action.payload.postId) {
        if (type === "profile_post" && post._id === postId) {
          return Object.assign({}, post, {
            like: action.payload.like,
          });
        }
        return post;
      }),
      savedPosts: state.savedPosts.map((post) => {
        const { type, postId } = action.payload;
        if (type === "saved_post" && post._id === postId) {
          return Object.assign({}, post, {
            like: action.payload.like,
          });
        }
        return post;
      }),
      home_post_list: state.home_post_list.map((post) => {
        const { type, postId } = action.payload;
        if (type === "home_post" && post._id === postId) {
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
        // postId가 있으면 post 좋아요
        // commentId가 있으면 comment 좋아요
        const { type, likeInfo } = action.payload;
        if (type === "profile_post" && post._id === likeInfo.postId) {
          return Object.assign({}, post, {
            // 기존 like 배열과 합치기
            like: [...post.like, likeInfo],
          });
        }
        return post;
      }),
      savedPosts: state.savedPosts.map((post) => {
        const { type, likeInfo } = action.payload;
        if (type === "saved_post" && post._id === likeInfo.postId) {
          return { ...post, like: [...post.like, likeInfo] };
        }
        return post;
      }),
      home_post_list: state.home_post_list.map((post) => {
        const { type, likeInfo } = action.payload;
        if (type === "home_post" && post._id === likeInfo.postId) {
          return { ...post, like: [...post.like, likeInfo] };
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
      savedPosts: state.savedPosts.map((post) => {
        if (post._id === payload.likeInfo.postId) {
          const filteredLike = post.like.filter(
            (like) => like._id !== payload.likeInfo._id,
          );
          return { ...post, like: [...filteredLike] };
        }
        return post;
      }),
      home_post_list: state.home_post_list.map((post) => {
        if (post._id === payload.likeInfo.postId) {
          const filteredLike = post.like.filter(
            (like) => like._id !== payload.likeInfo._id,
          );
          return { ...post, like: [...filteredLike] };
        }
        return post;
      }),
    }),
    [UNLIKE_FAILURE]: (state, { payload }) => ({
      ...state,
      error: payload,
    }),
    [SAVE_COMMENT_SUCCESS]: (state, action) => ({
      ...state,
      posts: state.posts.map((post) => {
        const { type, commentInfo } = action.payload;
        if (type === "profile_post" && post._id === commentInfo[0].postId) {
          return Object.assign({}, post, {
            comment: [action.payload.commentInfo[0], ...post.comment],
          });
        }
        return post;
      }),
      savedPosts: state.savedPosts.map((post) => {
        const { type, commentInfo } = action.payload;
        if (type === "saved_post" && post._id === commentInfo[0].postId) {
          return Object.assign({}, post, {
            comment: [action.payload.commentInfo[0], ...post.comment],
          });
        }
        return post;
      }),
      home_post_list: state.home_post_list.map((post) => {
        const { type, commentInfo } = action.payload;
        if (type === "home_post" && post._id === commentInfo[0].postId) {
          return Object.assign({}, post, {
            comment: [action.payload.commentInfo[0], ...post.comment],
          });
        }
        return post;
      }),
    }),

    [SAVE_COMMENT_FAILURE]: (state, action) => ({
      ...state,
      error: action.payload,
    }),
    // 댓글 조회
    [LOAD_COMMENT_SUCCESS]: (state, action) => ({
      ...state,
      posts: state.posts.map((post) => {
        const { type, postId } = action.payload;
        // 해당 포스터의 댓글만 찾기
        if (type === "profile_post" && post._id === postId) {
          return { ...post, ...{ comment: action.payload.comment } };
        }
        return post;
      }),
      savedPosts: state.savedPosts.map((post) => {
        const { type, postId } = action.payload;
        // 해당 포스터의 댓글만 찾기
        if (type === "saved_post" && post._id === postId) {
          return { ...post, ...{ comment: action.payload.comment } };
        }
        return post;
      }),
      home_post_list: state.home_post_list.map((post) => {
        const { type, postId, comment } = action.payload;
        if (type === "home_post" && post._id === postId) {
          return { ...post, ...{ comment } };
        }
        return post;
      }),
    }),
    [LOAD_COMMENT_FAILURE]: (state, action) => ({
      ...state,
      error: action.payload,
    }),
    // 댓글 삭제
    [DELETE_COMMENT_SUCCESS]: (state, action) => ({
      ...state,
      posts: state.posts.map((post) => {
        if (post._id === action.payload.postId) {
          const filteredComment = post.comment.filter(
            (comment) => comment._id !== action.payload.commentId,
          );
          return { ...post, comment: [...filteredComment] };
        }
        return post;
      }),
      savedPosts: state.savedPosts.map((post) => {
        if (post._id === action.payload.postId) {
          const filteredComment = post.comment.filter(
            (comment) => comment._id !== action.payload.commentId,
          );
          return { ...post, comment: [...filteredComment] };
        }
        return post;
      }),
    }),
    [DELETE_COMMENT_FAILURE]: (state, action) => ({
      ...state,
      error: action.payload,
    }),
  },
  initialState,
);

export default posts;

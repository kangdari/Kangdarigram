import React, { useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faImages,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getLikeCount } from "../../../../_actions/like_action";
import { loadComment } from "../../../../_actions/comment_action";

const Post = ({ postId, images, onClickPost, index, type }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.loading);
  // 저장된 포스트의 경우
  const likeCount = useSelector((state) => {
    if (type === "saved_post") {
      return state.posts.savedPosts.find((post) => post._id === postId).like;
    }
    if (type === "profile_post") {
      return state.posts.posts.find((post) => post._id === postId).like;
    }
  });

  const comment = useSelector((state) => {
    if (type === "saved_post") {
      return state.posts.savedPosts.find((post) => post._id === postId).comment;
    }
    if (type === "profile_post") {
      return state.posts.posts.find((post) => post._id === postId).comment;
    }
  });

  useEffect(() => {
    if (type === "saved_post") {
      dispatch(getLikeCount({ postId, type }));
      dispatch(loadComment({ postId, type }));
    }
    if (type === "profile_post") {
      dispatch(getLikeCount({ postId, type }));
      dispatch(loadComment({ postId, type }));
    }
  }, [dispatch, postId, loading, type]);

  return (
    <div className="post" onClick={() => onClickPost(index)}>
      <img src={`http://localhost:5050/${images[0]}`} alt="img" />
      <div className="post_hover">
        <div className="items">
          <div className="item">
            <FontAwesomeIcon icon={faHeart} />
            <span>{likeCount && likeCount.length}</span>
          </div>
          <div className="item">
            <FontAwesomeIcon icon={faComment} />
            {/* comment */}
            <span>{comment && comment.length}</span>
          </div>
        </div>
      </div>
      {images.length > 1 && <StyledIcon icon={faImages} />}
    </div>
  );
};

// 클릭 이벤트를 부모에서 주고 클릭한 post의 index 값을 인지 값으로 전달
const ProfilePost = ({ posts, onClickPost, type }) => {
  return (
    <ProfilePostBlock>
      {posts.map((post, index) => (
        <Post
          key={post._id}
          postId={post._id}
          images={post.images}
          onClickPost={onClickPost}
          index={index}
          type={type}
        />
      ))}
    </ProfilePostBlock>
  );
};

const StyledIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  color: white;
`;

const ProfilePostBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  cursor: pointer;

  .post {
    position: relative;
    width: calc(33% - 10px);
    margin-bottom: 20px;

    img {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }

    .post_hover {
      display: none;
    }

    .post_hover .items {
      width: 80%;
      display: flex;
      justify-content: space-around;
      color: #fff;
      font-size: 20px;
    }

    .post_hover .items .item {
      display: flex;
      flex: 30%;
      justify-content: space-evenly;
    }
  }

  .post:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }

  .post:hover .post_hover {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
  }

  /* 마지막 행 채우기 */
  &:after {
    width: calc(33% - 10px);
    content: "";
  }

  @media screen and (max-width: 736px) {
    .post {
      width: 33%;
      margin-bottom: 3px;

      .post_hover .items {
        font-size: 16px;
      }
    }

    &:after {
      width: 33%;
      content: "";
    }
  }
`;

export default ProfilePost;

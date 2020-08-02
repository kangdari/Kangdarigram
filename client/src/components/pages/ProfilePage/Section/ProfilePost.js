import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faImages,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getLikeCount } from "../../../../_actions/like_action";

// import { getComment } from "../../../../api/comment";

const Post = ({ postId, images, onClickPost, index }) => {
  const dispatch = useDispatch();

  const likeCount = useSelector(
    (state) => state.posts.posts.find((post) => post._id === postId).like,
  );
  const { loading } = useSelector((state) => state.loading);

  const [commentCount, setCommentCount] = useState(0); // comment 개수

  const getComment = useCallback(() => {
    axios.post("/api/comment/getComment", { postId }).then(({ data }) => {
      setCommentCount(data.comment.length);
    });
  }, [postId]);

  useEffect(() => {
    // post 불러오기가 끝나야 실행
    if (!loading) dispatch(getLikeCount({ postId }));
  }, [dispatch, postId, loading]);

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
            <span>{commentCount}</span>
          </div>
        </div>
      </div>

      {images.length > 1 && <StyledIcon icon={faImages} />}
    </div>
  );
};

// 클릭 이벤트를 부모에서 주고 클릭한 post의 index 값을 인지 값으로 전달
const ProfilePost = ({ posts, onClickPost }) => {
  return (
    <ProfilePostBlock>
      {posts.map((post, index) => (
        <Post
          key={post._id}
          postId={post._id}
          images={post.images}
          onClickPost={onClickPost}
          index={index}
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

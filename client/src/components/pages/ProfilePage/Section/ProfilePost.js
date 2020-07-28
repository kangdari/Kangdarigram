import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";

const Post = ({ image, onClickPost, index }) => {
  return (
    <div className="post" onClick={() => onClickPost(index)}>
      <img src={`http://localhost:5050/${image}`} alt="img" />

      <div className="post_hover">
        <div className="items">
          <div className="item">
            <FontAwesomeIcon icon={faHeart} />
            <span>1</span>
          </div>
          <div className="item">
            <FontAwesomeIcon icon={faComment} />
            <span>30</span>
          </div>
        </div>
      </div>
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
          image={post.images[0]}
          onClickPost={onClickPost}
          index={index}
        />
      ))}
    </ProfilePostBlock>
  );
};

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

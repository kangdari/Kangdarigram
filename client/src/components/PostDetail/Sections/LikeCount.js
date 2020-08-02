import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const LikeCount = ({ postId }) => {
  const likeCount = useSelector(
    (state) => state.posts.posts.find((post) => post._id === postId).like,
  );

  return (
    <LikeBlock>
      <button className="like_btn">
        좋아요 <span>{likeCount && likeCount.length}</span>
      </button>
    </LikeBlock>
  );
};

const LikeBlock = styled.section`
  padding: 0 16px;
  margin-top: 4px;
  .like_btn {
    font-weight: 600;
    border: none;
    outline: none;
    cursor: pointer;
    background: transparent;
  }
`;

export default LikeCount;

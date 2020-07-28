import React from "react";
import styled from "styled-components";

const Like = () => {
  return (
    <LikeBlock>
      <button className="like_btn">
        좋아요 <span>100</span>
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

export default Like;

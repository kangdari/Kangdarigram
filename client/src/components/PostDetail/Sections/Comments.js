import React from "react";
import styled from "styled-components";
import palette from "../../../utils/palette";

const Comments = ({ contents, tags }) => {
  return <CommentsBlock>{contents}</CommentsBlock>;
};

const CommentsBlock = styled.div`
  padding: 16px;
  height: 230px;
  border-bottom: 1px solid ${palette.gray[3]};

  @media screen and (max-width: 736px) {
    display: none;
  }
`;

export default Comments;

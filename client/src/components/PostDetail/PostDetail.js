import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

import Comments from "./Comments";
import Btn from "./Btn";
import Time from "./Time";
import Like from "./Like";
import WriteComment from "./WriteComment";

const PostDetail = () => {
  return (
    <PostDetailBlock>
      <Post>
        <PostHeader>
          <div className="icon">
            <FontAwesomeIcon icon={faUserCircle} />
          </div>
          {/* userid */}
          <div className="name">ksh4820</div>
        </PostHeader>
        <PostImageBox>
          <img
            alt="img"
            src={`http://localhost:5050/upload/1595821373047_Austr_1.jpg`}
          />
        </PostImageBox>
        <PostContents>
          {/* 댓글 보기 창  mobile에선 사라짐*/}
          <Comments />
          <Btn />
          <Like />
          <Time />
          {/* 댓글 쓰기 */}
          <WriteComment />
        </PostContents>
      </Post>
    </PostDetailBlock>
  );
};

const PostDetailBlock = styled.div`
  max-width: 935px;
  width: 100%;
  margin: auto;
  background: #fff;
`;

const Post = styled.article`
  position: relative;
  width: 100%;
`;

const PostImageBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 335px;
  min-height: 450px;
  background: #000;

  img {
    width: 100%;
  }
`;

const PostHeader = styled.header`
  width: 335px;
  height: 72px;
  position: absolute;
  top: 0;
  right: 0;
  padding: 16px;
  border-left: 1px solid lightgrey;
  border-bottom: 1px solid lightgrey;
  display: flex;
  align-items: center;

  .icon {
    width: 32px;
    height: 32px;
    font-size: 32px;
    color: lightgrey;
  }

  .name {
    margin-left: 1rem;
    font-weight: 600;
  }
`;

const PostContents = styled.div`
  width: 335px;
  position: absolute;
  top: 72px;
  right: 0;
  border-left: 1px solid lightgrey;
  /* display: flex;
  flex-direction: column; */
`;

export default PostDetail;

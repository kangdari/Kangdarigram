import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import palette from "../../utils/palette";

import Comments from "./Comments";
import Btn from "./Btn";
import Time from "./Time";
import Like from "./Like";
import WriteComment from "./WriteComment";

const PostDetail = ({ post }) => {
  const { contents, images, tags, _id } = post;
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
          <img alt="img" src={`http://localhost:5050/${images[0]}`} />
        </PostImageBox>
        <PostContents>
          {/* 댓글 보기 창  mobile에선 사라짐*/}
          <Comments contents={contents} tags={tags} />
          <Btn postId={_id} />
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

  @media screen and (max-width: 736px) {
    width: 100%;
  }
`;

const Post = styled.article`
  position: relative;
  width: 100%;

  @media screen and (max-width: 736px) {
    width: 258px;
    margin: 0 auto;
  }
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

  @media screen and (max-width: 736px) {
    display: block;
    margin-right: 0;
    background: transparent;
    min-height: inherit;
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
  @media screen and (max-width: 736px) {
    position: relative;
    width: 100%;
    border: none;
  }
`;

const PostContents = styled.div`
  width: 335px;
  position: absolute;
  top: 72px;
  right: 0;
  border-left: 1px solid ${palette.gray[3]};
  @media screen and (max-width: 736px) {
    position: static;
    width: 100%;
    border: none;
  }
`;

export default PostDetail;

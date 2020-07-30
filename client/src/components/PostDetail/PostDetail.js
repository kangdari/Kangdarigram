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
import ImageSlider from "../Common/ImageSlider";

const PostDetail = ({ post, id }) => {
  const { contents, images, tags, _id } = post;
  return (
    <PostDetailBlock>
      <Post>
        <PostHeader>
          <div className="icon">
            <FontAwesomeIcon icon={faUserCircle} />
          </div>
          {/* userid */}
          <div className="name">{id}</div>
        </PostHeader>
        <ImageSlider images={images} />
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

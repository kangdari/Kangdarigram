import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import palette from "../../utils/palette";

import Comments from "./Sections/Comments";
import Btn from "./Sections/Btn";
import Time from "./Sections/Time";
import Like from "./Sections/Like";
import WriteComment from "./Sections/WriteComment";
import ImageSlider from "../Common/ImageSlider";

import { getComment } from "../../api/comment";

const PostDetail = ({ post }) => {
  const user_Id = useSelector((state) => state.user.userData._id);
  const { contents, images, tags, _id, writer } = post;
  const [comment, setComment] = useState([]); // 댓글 목록

  const refreshComments = (updateComment) => {
    setComment(comment.concat(updateComment));
  };

  useEffect(() => {
    getComment({ postId: _id }).then(({ data }) => {
      if (data.success) {
        console.log("comment 불러오기 성공");
        setComment(data.comment);
      } else {
        alert("comment 불러오기 실패");
      }
    });
  }, [_id]);

  return (
    <PostDetailBlock>
      <Post>
        <PostHeader>
          <div className="icon">
            <FontAwesomeIcon icon={faUserCircle} />
          </div>
          {/* userid */}
          <div className="name">{writer.id}</div>
        </PostHeader>
        <ImageSlider images={images} />
        <PostContents>
          {/* 댓글 보기 창  mobile에선 사라짐*/}
          <Comments
            comment={comment}
            postContents={contents}
            tags={tags}
            writer={writer}
          />

          <Btn postId={_id} />
          <Like />
          <Time />
          {/* 댓글 쓰기 */}
          <WriteComment
            refreshComments={refreshComments}
            userId={user_Id}
            postId={_id}
          />
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
    font-size: 35px;
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
  display: flex;
  flex-direction: column;
  width: 335px;
  position: absolute;
  top: 72px;
  right: 0;
  bottom: 0;
  border-left: 1px solid ${palette.gray[3]};
  @media screen and (max-width: 736px) {
    position: static;
    width: 100%;
    border: none;
  }
`;

export default PostDetail;

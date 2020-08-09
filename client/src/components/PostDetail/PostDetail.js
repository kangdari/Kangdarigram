import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import palette from "../../utils/palette";

import Comments from "./Sections/Comments";
import Btn from "./Sections/Btn";
import Time from "./Sections/Time";
import LikeCount from "./Sections/LikeCount";
import WriteComment from "./Sections/WriteComment";
import ImageSlider from "../Common/ImageSlider";

const PostDetail = ({ post, type }) => {
  const { contents, images, tags, _id, writer, timeInterval } = post;
  const user_Id = useSelector((state) => state.user.userData._id);
  const comment = useSelector((state) => {
    // posts
    if (type === "saved_post") {
      return state.posts.savedPosts.find(
        (postItem) => postItem._id === post._id,
      ).comment;
    }
    if (type === "profile_post") {
      return state.posts.posts.find((postItem) => postItem._id === post._id)
        .comment;
    }
    if (type === "home_post") {
      return state.posts.home_post_list.find(
        (postItem) => postItem._id === post._id,
      ).comment;
    }
  });

  const like = useSelector((state) => {
    if (type === "saved_post") {
      return state.posts.savedPosts.find((post) => post._id === _id).like;
    }
    if (type === "profile_post") {
      return state.posts.posts.find((post) => post._id === _id).like;
    }
    if (type === "home_post") {
      return state.posts.home_post_list.find((post) => post._id === _id).like;
    }
  });

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
            postId={_id}
          />

          <Btn postId={_id} type={type} />
          <LikeCount likeInfo={like} />
          <Time timeInterval={timeInterval} />
          {/* 댓글 쓰기 */}
          <WriteComment userId={user_Id} postId={_id} type={type} />
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

import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";
import PostItemHeader from "./PostItemHeader";
import ImageSlider from "../../../Common/ImageSlider";
import Like from "../../../Common/Like";
import Save from "../../../Common/Save";
import Comment from "../../../Common/Comment";
import PostComment from "./PostComment";
import palette from "../../../../utils/palette";

import LikeCount from "../../../PostDetail/Sections/LikeCount";
import Time from "../../../PostDetail/Sections/Time";
import WriteComment from "../../../PostDetail/Sections/WriteComment";

const PostList = ({ post }) => {
  const { images, writer, _id, timeInterval } = post;
  const [likeInfo, setLikeInfo] = useState([]);
  const [commentInfo, setCommentInfo] = useState([]);

  const getLikeCount = useCallback(() => {
    axios
      .post("/api/like/get-like-count", { postId: _id })
      .then((res) => setLikeInfo(res.data.like));
  }, [_id]);

  const getComment = useCallback(() => {
    // 최신 댓글 2개만 조회
    axios
      .post("/api/comment/load-comment", { postId: _id, limit: 2 })
      .then((res) => setCommentInfo(res.data.comment));
  }, [_id]);

  useEffect(() => {
    getLikeCount();
    getComment();
  }, [getLikeCount, getComment]);

  return (
    <PostListBlock>
      {/* <PostItem> */}
      <PostItemHeader writer={writer} />
      <ImageSlider images={images} home={true} />
      <PostItemContents>
        {/* 좋아요, 댓글, 저장 버튼 */}
        <BtnBlock>
          <Like getLikeCount={getLikeCount} postId={_id} _size={"large"} />
          <Comment _size={"large"} />
          <Save postId={_id} _size={"large"} />
        </BtnBlock>
        {/* 좋아요 개수 */}
        <LikeCount likeInfo={likeInfo} />
        {/* 본문, 댓글 */}
        <PostComment post={post} commentInfo={commentInfo} />
        {/* 시간 */}
        {/* <Time timeInterval={timeInterval} /> */}
        <Time timeInterval={timeInterval} />
        {/* 댓글 작성 */}
        <WriteComment />
      </PostItemContents>
      {/* </PostItem> */}
    </PostListBlock>
  );
};

const PostListBlock = styled.article`
  display: flex;
  flex-direction: column;
  margin-bottom: 60px;
  border: 1px solid ${palette.gray[3]};
  border-radius: 4px;

  @media screen and (max-width: 735px) {
    margin-bottom: 15px;
  }
`;

const PostItemContents = styled.div`
  width: 100%;
`;

const BtnBlock = styled.div`
  display: flex;
  align-items: center;
  padding: 0 16px;
`;

export default PostList;

import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
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

import { loadComment } from "../../../../_actions/comment_action";

const PostList = ({ post, onClickPost }) => {
  const dispatch = useDispatch();
  const { images, writer, _id, timeInterval, comment } = post;
  const [likeInfo, setLikeInfo] = useState([]);
  const userId = useSelector((state) => state.user.userData._id); // 현재 사용자 _id
  const { loading } = useSelector((state) => state.loading);

  const getLikeCount = useCallback(() => {
    axios
      .post("/api/like/get-like-count", { postId: _id })
      .then((res) => setLikeInfo(res.data.like));
  }, [_id]);

  useEffect(() => {
    if (!loading) {
      dispatch(loadComment({ postId: _id, limit: 2, type: "home_post" }));
    }
  }, [getLikeCount, _id, loading, dispatch]);

  useEffect(() => {
    let mounted = true;

    axios.post("/api/like/get-like-count", { postId: _id }).then((res) => {
      if (mounted) {
        setLikeInfo(res.data.like);
      }
    });

    return () => (mounted = false);
  }, [_id]);

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
        <PostComment post={post} comment={comment} onClickPost={onClickPost} />
        {/* 시간 */}
        <Time timeInterval={timeInterval} />
        {/* 댓글 작성 */}
        <WriteComment postId={_id} userId={userId} type={"home_post"} />
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

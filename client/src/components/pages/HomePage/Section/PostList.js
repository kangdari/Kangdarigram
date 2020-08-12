import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import PostItemHeader from "./PostItemHeader";
import ImageSlider from "../../../Common/ImageSlider";
import Like from "../../../Common/Like";
import Save from "../../../Common/Save";
import Comment from "../../../Common/Comment";
import PostComment from "./PostComment";
import palette from "../../../../utils/palette";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

import LikeCount from "../../../PostDetail/Sections/LikeCount";
import Time from "../../../PostDetail/Sections/Time";
import WriteComment from "../../../PostDetail/Sections/WriteComment";

import { loadComment } from "../../../../_actions/comment_action";
import { getLikeCount } from "../../../../_actions/like_action";

const PostList = ({ post, onClickPost, onClickPostOption }) => {
  const dispatch = useDispatch();
  const { images, writer, _id, timeInterval, comment } = post;
  const userId = useSelector((state) => state.user.userData._id); // 현재 사용자 _id
  const { loading } = useSelector((state) => state.loading);
  const likeInfo = useSelector(
    (state) => state.posts.home_post_list.find((post) => post._id === _id).like,
  ); // 각 post 좋아요 정보

  useEffect(() => {
    if (!loading) {
      dispatch(loadComment({ postId: _id, limit: 2, type: "home_post" }));
      dispatch(getLikeCount({ postId: _id, type: "home_post" }));
    }
  }, [_id, loading, dispatch]);

  return (
    <PostListBlock>
      {/* <PostItem> */}
      <PostItemHeader writer={writer} />
      <PostButton
        onClick={() => onClickPostOption({ writerId: writer.id, postId: _id })}
      >
        <StyledIcon icon={faEllipsisH} />
      </PostButton>
      <ImageSlider images={images} home={true} />
      <PostItemContents>
        {/* 좋아요, 댓글, 저장 버튼 */}
        <BtnBlock>
          <Like postId={_id} _size={"large"} type={"home_post"} />
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
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 60px;
  border: 1px solid ${palette.gray[3]};
  border-radius: 4px;

  @media screen and (max-width: 735px) {
    margin-bottom: 15px;
  }
`;

const PostButton = styled.button`
  position: absolute;
  height: 50px;
  padding: 8px;
  top: 5px;
  right: 5px;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  color: #000;
  font-size: 13px;
  cursor: pointer;
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

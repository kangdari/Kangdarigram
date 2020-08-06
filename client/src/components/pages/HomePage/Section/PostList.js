import React from "react";
import styled from "styled-components";
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

const PostList = () => {
  const images = [
    "upload/1596540420423_africa_1.jpg",
    "upload/1596540420423_africa_1.jpg",
  ];

  return (
    <PostListBlock>
      {/* <PostItem> */}
      <PostItemHeader />
      <ImageSlider images={images} home={true} />
      <PostItemContents>
        {/* 좋아요, 댓글, 저장 버튼 */}
        <BtnBlock>
          <Like _size={"large"} />
          <Comment _size={"large"} />
          <Save _size={"large"} />
        </BtnBlock>
        {/* 좋아요 개수 */}
        <LikeCount />
        {/* 본문, 댓글 */}
        <PostComment />
        {/* 시간 */}
        {/* <Time timeInterval={timeInterval} /> */}
        <Time timeInterval={1} />
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

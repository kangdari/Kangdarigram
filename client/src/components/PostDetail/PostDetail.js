import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import palette from "../../utils/palette";

import Comments from "./Sections/Comments";
import Btn from "./Sections/Btn";
import Time from "./Sections/Time";
import LikeCount from "./Sections/LikeCount";
import WriteComment from "./Sections/WriteComment";
import ImageSlider from "../Common/ImageSlider";
import Modal from "../Common/Modal";
import PostOptionModal from "../pages/HomePage/Section/PostOptionModal";
import UserIcon from "../Common/UserIcon";

const PostDetail = ({ post, type, postDetailModalClose }) => {
  const [visible, setVisible] = useState(false); // Modal 렌더링 여부
  const [postOptionInfo, setPostOptionInfo] = useState({}); // postOptionButton 클릭 시

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
    if (type === "tag_post") {
      return state.posts.tag_post_list.find(
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
    if (type === "tag_post") {
      return state.posts.tag_post_list.find(
        (postItem) => postItem._id === post._id,
      ).like;
    }
  });

  const onOpenModal = (info) => {
    setPostOptionInfo(info);
    setVisible(true);
  };

  // 모달 off
  const onCloseModal = () => {
    setVisible(false);
    postDetailModalClose();
    document.body.style.cssText = `overflow: auto`;
  };

  return (
    <PostDetailBlock>
      <Post>
        <PostHeader>
          <UserIcon id={writer.id} image={writer.image} size={"small"} />
          {/* userid */}
          <div className="name">{writer.id}</div>
        </PostHeader>
        <PostButton
          onClick={() => onOpenModal({ writerId: writer.id, postId: _id })}
        >
          <StyledIcon icon={faEllipsisH} />
        </PostButton>
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

      {visible ? (
        <Modal
          visible={visible}
          onCloseModal={onCloseModal}
          closable={true} // 모달 종료 버튼 클릭 시 끄기 옵션
          maskClosable={true} // 모달 배경 클릭 시 끄기 옵션
          type={"post_option_modal"}
        >
          <PostOptionModal
            onCloseModal={onCloseModal}
            postOptionInfo={postOptionInfo}
            type={type}
          />
        </Modal>
      ) : null}
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

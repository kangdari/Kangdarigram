import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { deletePost } from "../../../../_actions/post_action";
// import axios from "axios";

const PostOptionModal = ({ onCloseModal, postOptionInfo }) => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.user.userData); // 현재 사용자 id
  const { writerId, postId } = postOptionInfo;

  const onDeletePost = () => {
    dispatch(deletePost(postId));
    // post 삭제
    // axios.delete(`/api/post/delete-post?postId=${postId}`);
  };

  return (
    <PostOptionModalBlock>
      {/* 현재 사용자일 때만 렌더링 */}
      {id === writerId && (
        <OptionButton onClick={onDeletePost} red>
          삭제
        </OptionButton>
      )}

      <OptionButton>링크 복사</OptionButton>
      <OptionLink to={`/${writerId}`}>프로필로 이동</OptionLink>
      <OptionButton onClick={onCloseModal}>취소</OptionButton>
    </PostOptionModalBlock>
  );
};

const PostOptionModalBlock = styled.div`
  width: 400px;
  border-radius: 7px;
  display: flex;
  background: white;
  flex-direction: column;

  @media screen and (max-width: 736px) {
    width: 260px;
  }
`;

const OptionLink = styled(Link)`
  min-height: 48px;
  padding: 4px 8px;
  font-weight: 500;
  color: ${(props) => (props.red ? "red" : "#000")};
  text-align: center;
  line-height: 48px;
`;

const OptionButton = styled.button`
  font-size: 14px;
  min-height: 48px;
  padding: 4px 8px;
  font-weight: 500;
  color: ${(props) => (props.red ? "red" : "#000")};
`;

export default PostOptionModal;

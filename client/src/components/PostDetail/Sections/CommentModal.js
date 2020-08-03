import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const CommentModal = ({ writerId, onCloseModal }) => {
  const userId = useSelector((state) => state.user.userData._id);
  return (
    <CommentModalBlock>
      {/* 신고 기능 없음 */}
      <CommentButton red>신고</CommentButton>
      {/* 댓글 작성자와 현재 사용자가 같을 때만 렌더링 */}
      {userId === writerId && <CommentButton red>삭제</CommentButton>}
      <CommentButton onClick={onCloseModal}>취소</CommentButton>
    </CommentModalBlock>
  );
};

const CommentModalBlock = styled.div`
  width: 400px;
  border-radius: 7px;
  display: flex;
  background: white;
  flex-direction: column;

  @media screen and (max-width: 736px) {
    width: 260px;
  }
`;

const CommentButton = styled.button`
  min-height: 48px;
  padding: 4px 8px;
  font-weight: 500;
  color: ${(props) => (props.red ? "red" : "#000")};
`;

export default CommentModal;

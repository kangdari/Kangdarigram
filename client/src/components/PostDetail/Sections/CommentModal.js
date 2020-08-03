import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { deleteComment } from "../../../_actions/comment_action";

const CommentModal = ({ postId, comment, onCloseModal }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userData._id);
  const [visible, setVisble] = useState(true); // 삭제 버튼 활성화 여부

  const onDeleteComment = () => {
    const { _id } = comment;
    dispatch(deleteComment({ _id, postId }));
    setVisble(false);
  };

  return (
    <CommentModalBlock>
      {/* 신고 기능 없음 */}
      <CommentButton red>신고</CommentButton>
      {/* 댓글 작성자와 현재 사용자가 같을 때고, visible이 true일 때 */}
      {userId === comment.writer._id && visible && (
        <CommentButton red onClick={onDeleteComment}>
          삭제
        </CommentButton>
      )}
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

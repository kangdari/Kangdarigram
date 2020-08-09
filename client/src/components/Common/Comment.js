import React from "react";
import styled from "styled-components";
import palette from "../../utils/palette";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

const Comment = ({ _size }) => {
  const onFocus = (e) => {
    // Comment icon 위치에서 가장 가까운 textarea(댓글 입력 창) 찾기
    const commentIcon = e.currentTarget; // 이벤트 생성 위치
    commentIcon.parentNode.parentNode
      .querySelector(".comment_textarea")
      .focus();
    // closest: explore 지원 x
    // commentIcon.closest("div ~ div").querySelector(".comment_textarea").focus();
  };

  return <StyledIcon icon={faComment} _size={_size} onClick={onFocus} />;
};

const StyledIcon = styled(FontAwesomeIcon)`
  color: ${palette.gray[5]};
  margin-left: 8px;
  /* small, large */
  font-size: ${(props) => (props._size === "large" ? "24px" : "10px")};
  cursor: pointer;
`;

export default Comment;

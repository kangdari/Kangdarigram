import React from "react";
import styled from "styled-components";
import palette from "../../utils/palette";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

const Comment = () => {
  const onFocus = () => {
    document.querySelector(".textarea").focus();
    // userToId 전달???
  };

  return <StyledIcon icon={faComment} onClick={onFocus} />;
};

const StyledIcon = styled(FontAwesomeIcon)`
  /* save state에 따라 색상 변화 */
  color: ${palette.gray[5]};
  margin-left: 8px;
  cursor: pointer;
`;

export default Comment;

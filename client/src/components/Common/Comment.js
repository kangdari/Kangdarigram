import React from "react";
import styled from "styled-components";
import palette from "../../utils/palette";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

const Comment = () => {
  const onFocus = () => {
    document.querySelector(".textarea").focus();
  };

  return <StyledIcon icon={faComment} onClick={onFocus} />;
};

const StyledIcon = styled(FontAwesomeIcon)`
  color: ${palette.gray[5]};
  margin-left: 8px;
  cursor: pointer;
`;

export default Comment;

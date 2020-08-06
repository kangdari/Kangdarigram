import React from "react";
import styled from "styled-components";
import palette from "../../utils/palette";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

const Comment = ({ _size }) => {
  const onFocus = () => {
    document.querySelector(".textarea").focus();
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

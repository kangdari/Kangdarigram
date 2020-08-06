import React from "react";
import styled from "styled-components";
import palette from "../../../../utils/palette";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const PostItemHeader = ({ writer }) => {
  return (
    <PostItemBlock>
      <div className="user_icon">
        <StyledIcon icon={faUserCircle} />
      </div>
      <div className="user_id">
        <span>
          <Link to={`/${writer.id}`}>{writer.id}</Link>
        </span>
      </div>
    </PostItemBlock>
  );
};

const PostItemBlock = styled.header`
  width: 100%;
  height: 60px;
  padding: 15px;
  display: flex;
  align-items: center;

  .user_id {
    margin-left: 14px;
    font-size: 14px;
    font-weight: 500;
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  color: ${palette.gray[5]};
  font-size: 32px;
  cursor: pointer;
`;

export default PostItemHeader;

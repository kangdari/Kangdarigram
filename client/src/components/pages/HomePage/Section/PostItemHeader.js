import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import UserIcon from "../../../Common/UserIcon";

const PostItemHeader = ({ writer }) => {
  return (
    <PostItemBlock>
      <UserIcon id={writer.id} image={writer.image} size={"small"} />
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

export default PostItemHeader;

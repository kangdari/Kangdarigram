import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import palette from "../../../utils/palette";

const User = ({ likeInfo }) => {
  const { id, name } = likeInfo.userId;

  return (
    <UserBlock>
      <div className="icon">
        <StyledIcon icon={faUserCircle} />
      </div>
      <div className="info">
        <p className="user_id">{id}</p>
        <p className="user_name">{name}</p>
      </div>
    </UserBlock>
  );
};

const UserBlock = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 16px;

  .user_id {
    font-weight: 600;
  }

  .user_name {
    margin-top: 5px;
    color: ${palette.gray[6]};
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  margin-right: 20px;
  font-size: 45px;
  color: lightgrey;
  cursor: pointer;
`;

const LikeUserModal = ({ likeInfo }) => {
  return (
    <LikeUserModalBlock>
      <h1 className="title">좋아요</h1>
      {likeInfo &&
        likeInfo.map((like, index) => <User likeInfo={like} key={index} />)}
    </LikeUserModalBlock>
  );
};

const LikeUserModalBlock = styled.div`
  background: white;
  width: 400px;
  max-height: 100%;
  border-radius: 8px;

  .title {
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    height: 43px;
    line-height: 43px;
    border-bottom: 1px solid ${palette.gray[4]};
  }

  @media screen and (max-width: 736px) {
    width: 260px;
  }
`;
export default LikeUserModal;

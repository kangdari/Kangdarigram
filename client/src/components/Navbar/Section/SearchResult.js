import React from "react";
import styled from "styled-components";
import palette from "../../../utils/palette";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const UserItem = ({ user }) => {
  const { id, name } = user;
  return (
    <UserLink to={`/${id}`}>
      <UserContainer>
        <StyledIcon icon={faUserCircle} />
        <UserInner>
          <UserId>{id}</UserId>
          <UserName>{name}</UserName>
        </UserInner>
      </UserContainer>
    </UserLink>
  );
};

const SearchResult = ({ searchResult }) => {
  if (searchResult.length === 0) {
    return (
      <SearchResultBlock>
        <UserBlock>
          <Message>검색 결과가 없습니다.</Message>
        </UserBlock>
      </SearchResultBlock>
    );
  }
  return (
    <SearchResultBlock>
      <UserBlock>
        {searchResult.map((user) => (
          <UserItem user={user} key={user._id} />
        ))}
      </UserBlock>
    </SearchResultBlock>
  );
};

const Message = styled.div`
  padding: 15px 10px;
  text-align: center;
  color: ${palette.gray[6]};
`;

const UserName = styled.span`
  width: 100%;
  color: ${palette.gray[6]};
  font-weight: 300;
  line-height: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const UserId = styled.span`
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const UserInner = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const UserLink = styled(Link)`
  width: 100%;
  height: 60px;
  padding: 8px 14px;
  border-bottom: 1px solid ${palette.gray[4]};
  display: flex;
  align-items: center;

  &:hover {
    background: ${palette.gray[1]};
  }
`;

const UserBlock = styled.div`
  max-height: 362px;
  overflow-x: hidden;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const SearchResultBlock = styled.div`
  width: 243px;
  position: absolute;
  top: 45px;
  left: -15px;
  border: 1px solid ${palette.gray[4]};
  border-radius: 4px;
  background: #fff;
  z-index: 4;

  &::after {
    border-color: transparent transparent rgba(var(--d87, 255, 255, 255), 1)
      transparent;
    border-style: solid;
    border-width: 0 10px 10px 10px;
    content: " ";
    height: 0;
    left: 110px;
    position: absolute;
    top: -10px;
    width: 0;
    z-index: 3;
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  color: ${palette.gray[5]};
  font-size: 32px;
  cursor: pointer;
`;

export default SearchResult;

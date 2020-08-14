import React from "react";
import styled from "styled-components";
import palette from "../../../utils/palette";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faHashtag } from "@fortawesome/free-solid-svg-icons";

const UserItem = ({ user, clearKeyword }) => {
  const { id, name } = user;
  return (
    <LinkItem to={`/${id}`} tabIndex="0" onClick={clearKeyword}>
      <ContentsBlock>
        <StyledIcon icon={faUserCircle} />
        <ContentsInner>
          <Title>{id}</Title>
          <Contents>{name}</Contents>
        </ContentsInner>
      </ContentsBlock>
    </LinkItem>
  );
};

const TagList = ({ tag }) => {
  return (
    <LinkItem to={`/explore/tags/${tag}`}>
      <ContentsBlock>
        <StyledIcon icon={faHashtag} small={1} />
        <ContentsInner>
          <Title>{tag}</Title>
        </ContentsInner>
      </ContentsBlock>
    </LinkItem>
  );
};

const SearchResult = ({ searchResult, searchType, clearKeyword }) => {
  // #만 입력 했을 때
  if (searchType === "none") {
    return null;
  }
  // 검색 결과 없을 때
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
    <SearchResultBlock className="result">
      <UserBlock>
        {/* user 검색 */}
        {searchType === "user" &&
          searchResult.map((user) => (
            <UserItem user={user} key={user._id} clearKeyword={clearKeyword} />
          ))}
        {/* # 태그 검색 */}
        {searchType === "tag" &&
          searchResult.map((tag, index) => <TagList tag={tag} key={index} />)}
      </UserBlock>
    </SearchResultBlock>
  );
};

const Message = styled.div`
  padding: 15px 10px;
  text-align: center;
  color: ${palette.gray[6]};
`;

const Contents = styled.span`
  width: 100%;
  color: ${palette.gray[6]};
  font-weight: 300;
  line-height: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Title = styled.span`
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ContentsInner = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ContentsBlock = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const LinkItem = styled(Link)`
  width: 100%;
  height: 60px;
  padding: 8px 14px;
  border-bottom: 1px solid ${palette.gray[4]};
  display: flex;
  align-items: center;
  outline: none;
  z-index: 5;

  &:hover {
    background: ${palette.gray[0]};
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

  &:after {
    content: "";
    position: absolute;
    top: -9px;
    left: 50%;
    width: 15px;
    height: 15px;
    border: 1px solid ${palette.gray[4]};
    border-right: none;
    border-bottom: none;
    background: #fff;
    transform: translateX(-50%) rotate(45deg);
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  color: ${palette.gray[5]};
  font-size: ${(props) => (props.small ? "20px" : "32px")};
  cursor: pointer;
`;

export default SearchResult;

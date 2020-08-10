import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import palette from "../../../utils/palette";
import axios from "axios";

import SearchResult from "./SearchResult";

// ref 사용해서 input focus 관리
// 엔터로 검색할 수 있도록 관리

const SearchBox = () => {
  const [keyword, setKeyWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  // 검색 함수
  const onSearch = useCallback((keyword) => {
    const data = { searchValue: keyword };
    setLoading(true);
    axios.post("/api/users/load-user-list", data).then((res) => {
      if (res.data.success) {
        setSearchResult(res.data.userList);
        setLoading(false);
      }
    });
  }, []);

  const onChangeHanlder = (e) => {
    const searchValue = e.currentTarget.value;
    setKeyWord(searchValue);
    // 검색어가 있을 때만 검색 수행
    if (searchValue) onSearch(searchValue);
  };

  return (
    <SearchForm>
      <input
        value={keyword}
        onChange={onChangeHanlder}
        className="search_input"
        type="text"
      />
      <div className="placeholder">
        <FontAwesomeIcon className="search_icon" icon={faSearch} />
        {/* <span className="text">{keyword ? keyword : "검색"}</span> */}
      </div>
      {/* 로딩 이미지 */}
      {loading && <StyledIcon icon={faSpinner} />}
      {/* 로딩 종료, 결과가 있고, 검색어가 있을 때만 결과창 렌더링*/}
      {/* {!loading && searchResult.length > 0 && keyword && ( */}
      {!loading && keyword && <SearchResult searchResult={searchResult} />}
    </SearchForm>
  );
};

const StyledIcon = styled(FontAwesomeIcon)`
  color: ${palette.gray[5]};
  font-size: 10px;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const SearchForm = styled.form`
  position: relative;
  width: 215px;
  height: 28px;

  .search_input {
    width: 100%;
    height: 100%;
    padding: 3px 10px 3px 26px;
    outline: none;
    border: 1px solid ${palette.gray[5]};
    border-radius: 3px;
  }

  .placeholder {
    position: absolute;
    top: 8px;
    width: 100%;
    font-size: 11px;
    color: ${palette.gray[5]};
    user-select: none;
    pointer-events: none;
    text-align: center;
  }

  .search_input:focus ~ .placeholder {
    left: 10px;
    text-align: left;
  }
  .search_input:focus ~ .placeholder .text {
    display: none;
  }

  @media screen and (max-width: 650px) {
    display: none;
  }
`;

export default SearchBox;

import React, { useState, useCallback, useRef, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import palette from "../../../utils/palette";
import axios from "axios";

import SearchResult from "./SearchResult";

const SearchBox = () => {
  const inputEl = useRef(null);
  const [keyword, setKeyWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [focusState, setFocusState] = useState(false);

  const onFocusHandler = (e) => {
    setFocusState(true);
  };

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (e.target !== inputEl.current) {
        setFocusState(false);
        setKeyWord("");
      }
    });
  }, []);

  const clearKeyword = useCallback(() => {
    setKeyWord("");
  }, []);

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
        ref={inputEl}
        value={keyword}
        onChange={onChangeHanlder}
        onFocus={onFocusHandler} // focus 상태
        // onBlur={onBlurHandler} // focus 상태에서 벗어날 때
        className="search_input"
        type="text"
      />
      <div className="placeholder">
        <FontAwesomeIcon className="search_icon" icon={faSearch} />
        <span className="text">검색</span>
      </div>
      {/* 로딩 이미지 */}
      {loading && <StyledIcon icon={faSpinner} />}
      {/* 로딩 종료, 결과가 있고, 검색어가 있을 때만 결과창 렌더링*/}
      {!loading && keyword && focusState && (
        <SearchResult searchResult={searchResult} clearKeyword={clearKeyword} />
      )}
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

const SearchForm = styled.div`
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

  .placeholder .text {
    margin-left: 5px;
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

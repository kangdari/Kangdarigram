import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import palette from '../../../utils/palette';

const SearchBox = () => {
  const [Keyword, setKeyWord] = useState('');

  // 자동 검색으로 변환 예정
  const onChangeHanlder = (e) => {
    setKeyWord(e.currentTarget.value);
  };

  return (
    <SearchForm>
      <input value={Keyword} onChange={onChangeHanlder} className='search_input' type='text' />
      <div className='placeholder'>
        <FontAwesomeIcon className='search_icon' icon={faSearch} />
        {/* <span className='text'>{Keyword ? Keyword : '검색'}</span> */}
      </div>
    </SearchForm>
  );
};

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
    /* left: 0; */
    /* text-align: left; */
  }
  .search_input:focus ~ .placeholder .text {
    display: none;
  }
`;

export default SearchBox;

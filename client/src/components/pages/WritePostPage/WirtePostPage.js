import React from 'react';
import styled from 'styled-components';

import FileUplaod from '../../Common/FileUplaod';
import TagBox from './Sections/TagBox';
import Button from '../../Common/Button';

const WirtePostPage = () => {
  return (
    <WirtePostPageBlock>
      <h1 className='title'>POST 작성</h1>
      <form>
        <FileUplaod />
        <TextArea placeholder='내용 입력...' />
        <TagBox />
        <Button type='submit' blue>
          작성
        </Button>
        <Button to='/' blue>
          취소
        </Button>
      </form>
    </WirtePostPageBlock>
  );
};

const WirtePostPageBlock = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 80px auto 0 auto;
  padding: 0 20px;

  .title {
    text-align: center;
    font-size: 3rem;
    font-weight: 500;
    margin-bottom: 30px;
  }

  button {
    margin-right: 10px;
  }
`;

const TextArea = styled.textarea`
  font-size: 1.2rem;
  width: 100%;
  height: 150px;
  outline: none;
  border: 1px solid lightgrey;
  margin-bottom: 2rem;
  padding: 15px;
  overflow-y: auto;
  border-radius: 4px;
`;

export default WirtePostPage;

import React, { useState } from 'react';
import styled from 'styled-components';

import FileUplaod from '../../Common/FileUplaod';
import TagBox from './Sections/TagBox';
import Button from '../../Common/Button';
import { uploadPost } from '../../../api/post';

const WirtePostPage = ({ user, history }) => {
  const [contents, setContents] = useState('');
  const [images, setImages] = useState('');
  const [tags, setTags] = useState([]);

  const onChangeHandler = (e) => setContents(e.currentTarget.value);

  const updateImages = (images) => setImages(images);

  const upadateTags = (tags) => setTags(tags);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    // 예외 처리
    if (!images) {
      return alert('이미지를 올려주세요.');
    }

    const body = {
      writer: user.userData._id,
      contents,
      images,
      tags,
    };

    // 서버에 post 업로드 요청
    uploadPost(body).then((res) => {
      if (res.data.uploadSuccess) {
        history.push('/');
      } else {
        alert('포스트 업로드 실패');
      }
    });
  };

  return (
    <WirtePostPageBlock>
      <h1 className='title'>POST 작성</h1>
      <form onSubmit={onSubmitHandler}>
        <FileUplaod updateImages={updateImages} />
        <TextArea value={contents} onChange={onChangeHandler} placeholder='내용 입력...' />
        <TagBox upadateTags={upadateTags} />
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

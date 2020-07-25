import React, { useState } from 'react';
import styled from 'styled-components';
import TagList from './TagList';
import palett from '../../../../utils/palette';
import Button from '../../../Common/Button';

const TagBox = () => {
  const [input, setInput] = useState('');
  const [tags, setTags] = useState([]);

  const insertTag = (tag) => {
    if (tags.includes(tag)) return; // 중복 tag 검사
    const nextTags = [...tags, tag];
    setTags(nextTags); // tags 업데이트
  };

  // 태그 제거
  const onDelete = (tag) => {
    const nextTags = tags.filter((item) => item !== tag);
    setTags(nextTags);
  };

  const onChangeHandler = (e) => {
    setInput(e.currentTarget.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const tag = input.trim();
    if (!tag) return;
    insertTag(tag);
    setInput('');
  };

  return (
    <TagBoxBlock>
      <TagForm>
        <input placeholder='태그를 입력하세요' value={input} onChange={onChangeHandler} />
        <Button onClick={onSubmitHandler} blue>
          추가
        </Button>
      </TagForm>
      <TagList tags={tags} onDelete={onDelete} />
    </TagBoxBlock>
  );
};

const TagBoxBlock = styled.div``;

const TagForm = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
  margin-bottom: 20px;

  input {
    font-size: 1.2rem;
    outline: none;
    padding: 10px;
    border: 1px solid ${palett.gray[3]};
    border-radius: 4px;
  }

  button {
    font-size: 1.1rem;
  }
`;

export default TagBox;

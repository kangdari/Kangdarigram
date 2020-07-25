import React from 'react';
import styled from 'styled-components';
import palett from '../../../../utils/palette';

const TagList = React.memo(({ tags, onDelete }) => (
  <TagListBlock>
    {tags.map((tag, index) => (
      <div className='tag_item' key={index} onClick={() => onDelete(tag)}>
        #{tag}
      </div>
    ))}
  </TagListBlock>
));

const TagListBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;

  .tag_item {
    margin: 0 10px 5px 0;
    color: ${palett.blue[4]};
    font-size: 1.1rem;
    font-weight: 500;
    cursor: pointer;
  }
`;

export default TagList;

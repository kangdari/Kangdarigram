import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';

const Post = ({ image, onClickPost, index }) => {
  return (
    <div className='post' onClick={() => onClickPost(index)}>
      <div className='post_inner'>
        <img src={`http://localhost:5050/${image}`} alt='img' />
      </div>
      <div className='post_hover'>
        <div className='items'>
          {/* 좋아요 */}
          <FontAwesomeIcon icon={faHeart} />
          <span>10</span>
          {/* 댓글 수 */}
          <FontAwesomeIcon icon={faComment} />
          <span>3</span>
        </div>
      </div>
    </div>
  );
};

// 클릭 이벤트를 부모에서 주고 클릭한 post의 index 값을 인지 값으로 전달
const ProfilePost = ({ posts, onClickPost }) => {
  return (
    <ProfilePostBlock>
      {posts.map((post, index) => (
        <Post key={post._id} image={post.images[0]} onClickPost={onClickPost} index={index} />
      ))}
    </ProfilePostBlock>
  );
};

const ProfilePostBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .post {
    position: relative;
    width: calc(33% - 10px);
    position: relative;
    margin-bottom: 20px;
    cursor: pointer;

    .post_inner {
      display: block;
      padding-bottom: 100%;
      overflow: hidden;

      img {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
      }
    }

    .post_hover {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .items {
      width: calc(35%);
      display: flex;
      justify-content: space-between;
      color: #fff;
      font-size: 20px;
    }
  }

  .post:hover .post_hover {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
  }

  &:after {
    width: calc(33% - 10px);
    content: '';
  }

  @media screen and (max-width: 992px) {
    .post {
      width: 33%;
      margin-bottom: 3px;
    }

    &:after {
      width: 33%;
      content: '';
    }
  }
`;

export default ProfilePost;

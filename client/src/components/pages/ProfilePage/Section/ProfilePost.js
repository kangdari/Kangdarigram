import React from 'react';
import styled from 'styled-components';

const Post = ({ post }) => {
  const { contents, images, tags } = post;
  return (
    <div className='box'>
      <div className='box_inner'>
        <img src={`http://localhost:5050/${images[0]}`} alt='img' />
      </div>
    </div>
  );
};

const ProfilePost = ({ posts }) => {
  return (
    <ProfilePostBlock>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </ProfilePostBlock>
  );
};

const ProfilePostBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .box {
    width: calc(33% - 10px);
    position: relative;
    margin-bottom: 20px;
    cursor: pointer;

    .box_inner {
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
  }

  &:after {
    width: calc(33% - 10px);
    content: '';
  }

  @media screen and (max-width: 992px) {
    .box {
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

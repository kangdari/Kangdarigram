import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProfileInfo from './Section/ProfileInfo';
import ProfileLink from './Section/ProfileLink';
import ProfilePost from './Section/ProfilePost';

import { loadPost } from '../../../api/post';

const ProfilePage = ({ user }) => {
  const [posts, setPosts] = useState([]); // 유저가 작성한 post 정보

  // 서버에서 유저가 쓴 게시글에 대한 정보를 긁어옴
  useEffect(() => {
    const body = {
      _id: user.userData._id,
    };

    loadPost(body).then((res) => {
      if (res.data.success) {
        setPosts(res.data.postInfo);
      }
    });
  }, [user.userData]);

  return (
    <ProfilePageBlock>
      <ProfileInfo posts={posts} />
      <ProfileLink />
      <ProfilePost posts={posts} />
    </ProfilePageBlock>
  );
};

const ProfilePageBlock = styled.main`
  max-width: 935px;
  width: 100%;
  margin: 90px auto 0 auto;
  padding: 20px 20px 0;
`;

export default ProfilePage;

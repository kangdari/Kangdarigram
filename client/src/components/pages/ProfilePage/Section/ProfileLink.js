import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import palette from '../../../../utils/palette';

const ProfileLink = () => {
  // kang => user id로 변경

  return (
    <ProfileLinkBlock>
      <NavLink className='link' activeClassName='active' to='/kang' exact>
        게시물
      </NavLink>
      <NavLink className='link' activeClassName='active' to='/kang/video'>
        동영상
      </NavLink>
      <NavLink className='link' activeClassName='active' to='/kang/saved'>
        저장됨
      </NavLink>
      <NavLink className='link' activeClassName='active' to='/kang/tagged'>
        태그됨
      </NavLink>
    </ProfileLinkBlock>
  );
};

const ProfileLinkBlock = styled.div`
  display: flex;
  align-items: center;
  height: 55px;
  justify-content: center;
  color: ${palette.gray[6]};
  border-top: 1px solid ${palette.gray[3]};

  .link {
    margin-right: 60px;
  }

  .active {
    color: #000;
    font-weight: 600;
  }
`;

export default ProfileLink;

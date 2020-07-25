import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faCommentDots,
  faCompass,
  faHeart,
  faUserCircle,
  faBookmark,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../Common/Button';
import palette from '../../../utils/palette';
import { logout } from '../../../_actions/user_action';

const RightMenu = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const [show, setShow] = useState(false);

  const onShow = () => {
    show ? setShow(false) : setShow(true);
  };

  const onLogout = () => {
    dispatch(logout());
    setShow(false);
  };

  if (!userData.isAuth) {
    return (
      <div>
        <Button to='/login' blue>
          로그인
        </Button>
        <Button to='/register'>회원가입</Button>
      </div>
    );
  } else {
    return (
      <RightMenuBlock>
        <Link className='link_icon' to='/'>
          <FontAwesomeIcon icon={faHome} color='white' />
        </Link>
        <Link className='link_icon' to=''>
          <FontAwesomeIcon icon={faCommentDots} color='white' />
        </Link>
        <Link className='link_icon' to=''>
          <FontAwesomeIcon icon={faCompass} color='white' />
        </Link>
        <Link className='link_icon' to=''>
          <FontAwesomeIcon icon={faHeart} color='white' />
        </Link>
        <div className='profile'>
          <FontAwesomeIcon icon={faUserCircle} color='white' onClick={onShow} />
          {show ? (
            <div className='profile_modal'>
              <div className='item'>
                <Link to='#'>
                  <FontAwesomeIcon icon={faBookmark} color='white' />
                  저장됨
                </Link>
              </div>
              <div className='item' onClick={onLogout}>
                로그아웃
              </div>
            </div>
          ) : null}
        </div>
      </RightMenuBlock>
    );
  }
};

const RightMenuBlock = styled.div`
  display: flex;

  svg {
    font-size: 24px;
    margin: 0 10px;
    stroke: black;
    stroke-width: 25;
  }

  .profile {
    cursor: pointer;
    position: relative;

    .profile_modal {
      position: absolute;
      top: 36px;
      right: 0;
      width: 150px;
      background: #fff;
      border-radius: 4px;
      box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.1);

      svg {
        font-size: 14px;
        margin: 0;
        margin-right: 10px;
      }

      .item {
        padding: 8px 18px;
        font-size: 14px;
      }

      .item:hover {
        background: ${palette.gray[1]};
      }
    }
  }
`;

export default RightMenu;

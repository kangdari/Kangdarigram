import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faCommentDots,
  faCompass,
  faHeart,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';

const RightMenu = () => {
  return (
    <RightMenuBlock>
      <NavLink className='link_icon' to='/'>
        <FontAwesomeIcon icon={faHome} />
      </NavLink>
      <NavLink className='link_icon' to=''>
        <FontAwesomeIcon icon={faCommentDots} />
      </NavLink>
      <NavLink className='link_icon' to=''>
        <FontAwesomeIcon icon={faCompass} />
      </NavLink>
      <NavLink className='link_icon' to=''>
        <FontAwesomeIcon icon={faHeart} />
      </NavLink>
      <NavLink className='link_icon' to=''>
        <FontAwesomeIcon icon={faUserCircle} />
      </NavLink>
    </RightMenuBlock>
  );
};

const RightMenuBlock = styled.div`
  display: flex;

  .link_icon {
    font-size: 24px;
    margin: 0 10px;
  }
`;

export default RightMenu;

// import React from 'react';
// import Button from '../../Common/Button';

// import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../../../_actions/user_action';

// const RightMenu = () => {
//   const dispatch = useDispatch();
//   const { userData } = useSelector((state) => state.user);

//   const onLogout = () => {
//     dispatch(logout());
//   };

//   if (!userData.isAuth) {
//     return (
//       <>
//         <Button to='/register'>Register</Button>
//         <Button to='/login'>Login</Button>
//       </>
//     );
//   } else {
//     return (
//       <>
//         <Button onClick={onLogout}>Logout</Button>
//       </>
//     );
//   }
// };

// export default RightMenu;

import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import palette from "../../../../utils/palette";

const ProfileLink = () => {
  const { id } = useSelector((state) => state.user.userData);

  return (
    <ProfileLinkBlock>
      <NavLink className="link" activeClassName="active" to={`/${id}`} exact>
        게시물
      </NavLink>
      <NavLink className="link" activeClassName="active" to={`/${id}/video`}>
        동영상
      </NavLink>
      <NavLink className="link" activeClassName="active" to={`/${id}/saved`}>
        저장됨
      </NavLink>
      <NavLink className="link" activeClassName="active" to={`/${id}/tagged`}>
        태그됨
      </NavLink>
    </ProfileLinkBlock>
  );
};

const ProfileLinkBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${palette.gray[6]};
  border-top: 1px solid ${palette.gray[3]};

  .link {
    height: 55px;
    display: flex;
    align-items: center;
    margin-right: 60px;
  }

  .active {
    border-top: 1px solid #000;
    color: #000;
    font-weight: 600;
  }
`;

export default ProfileLink;

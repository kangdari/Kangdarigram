import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import UserIcon from "../../../Common/UserIcon";
import palette from "../../../../utils/palette";

const Aside = React.forwardRef((props, ref) => {
  const { id, image, name } = useSelector((state) => state.user.userData);

  return (
    <AsideBlock ref={ref}>
      <User>
        <UserIcon id={id} image={image ? image : ""} />
        <Info>
          <Link to={`/${id}`} className="id">
            {id}
          </Link>
          <span className="name">{name}</span>
        </Info>
      </User>
    </AsideBlock>
  );
});

const AsideBlock = styled.div`
  position: fixed;
  width: 293px;
  height: 100vh;
  top: 88px;
  right: 400px;

  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const Info = styled.div`
  margin-left: 20px;
  .id {
    display: block;
    font-weight: 800;
    margin-bottom: 5px;
  }
  .name {
    color: ${palette.gray[6]};
  }
`;

export default Aside;

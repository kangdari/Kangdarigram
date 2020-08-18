import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ec2 from "../../utils/ec2";

const UserIcon = ({ id, image, size }) => {
  const clickHandler = () => {
    document.body.style.cssText = `overflow: auto`;
  };

  return (
    <UserIconBlock size={size} onClick={clickHandler}>
      <UserIconLink to={`/${id}`}>
        {image.length !== 0 ? (
          //<UserImg src={`http://localhost:5050/${image}`} alt="user_img" />
          <UserImg src={`${ec2}/${image}`} alt="user_img" />
        ) : (
          <UserImg
            // src={`http://localhost:5050/upload/default_user_icon.jpg`}
            src={`${ec2}/upload/default_user_icon.jpg`}
            alt="default_img"
          />
        )}
      </UserIconLink>
    </UserIconBlock>
  );
};

const UserIconBlock = styled.div`
  width: ${({ size }) => {
    if (size === "small") return "35px";
    if (size === "large") return "150px";
    return "50px";
  }};
  height: ${({ size }) => {
    if (size === "small") return "35px";
    if (size === "large") return "150px";
    return "50px";
  }};

  overflow: hidden;
  border-radius: 50%;
  margin-bottom: 5px;
`;

const UserIconLink = styled(Link)`
  width: 100%;
  height: 100%;
`;

const UserImg = styled.img`
  width: 100%;
  height: 100%;
`;

export default UserIcon;

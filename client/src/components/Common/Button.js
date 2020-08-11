import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import palette from "../../utils/palette";

const buttonStyle = css`
  border: none;
  outline: none;
  text-decoration: none;
  color: ${palette.blue[3]};
  font-family: "Apple SD Gothic Neo", Arial, sans-serif;
  font-size: 14px;
  font-weight: 800;
  padding: 5px 9px;
  border-radius: 4px;
  cursor: pointer;
  background: white;

  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
    `}

  ${(props) =>
    props.blue &&
    css`
      background: ${palette.blue[5]};
      color: #fff;
      /* &:hover: {
        background: ${palette.blue[4]};
      } */
    `}
`;

const StyledLink = styled(Link)`
  ${buttonStyle}
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

// to props가 존재하면 Link 컴포넌트
// 존재하지 않으면 button 컴포넌트
const Button = (props) => {
  return props.to ? (
    <StyledLink {...props} blue={props.blue ? 1 : 0} />
  ) : (
    <StyledButton {...props} />
  );
};

export default Button;

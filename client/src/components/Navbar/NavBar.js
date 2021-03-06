import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import palette from "../../utils/palette";
import RightMenu from "./Section/RightMenu";
import SearchBox from "./Section/SearchBox";

const NavBar = () => {
  return (
    <NavBarBlock>
      <div className="navbar">
        <Link to="/" className="logo">
          Kangdarigram
        </Link>
        <SearchBox />
        <RightMenu />
      </div>
    </NavBarBlock>
  );
};

const NavBarBlock = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 54px;
  border-bottom: 1px solid ${palette.gray[2]};
  background: #fff;
  z-index: 10;

  .navbar {
    width: 100%;
    max-width: 975px;
    height: 100%;
    padding: 0 20px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .logo {
      text-transform: uppercase;
      font-size: 20px;
      font-weight: 600;
      /* width: 150px; */
    }
  }
`;

export default NavBar;

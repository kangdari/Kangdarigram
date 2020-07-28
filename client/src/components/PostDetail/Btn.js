import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";

const Btn = () => {
  return (
    <BtnBlock>
      <span className="btn">
        <FontAwesomeIcon icon={faHeart} />
      </span>
      <span className="btn">
        <FontAwesomeIcon icon={faComment} />
      </span>
      <span className="btn save">
        <FontAwesomeIcon icon={faBookmark} />
      </span>
    </BtnBlock>
  );
};

const BtnBlock = styled.section`
  display: flex;
  padding: 0 8px;
  margin-top: 4px;
  .btn {
    margin: 8px;
    cursor: pointer;
  }

  .save {
    margin-left: auto;
  }

  svg {
    font-size: 24px;
    stroke: black;
    stroke-width: 35;
    color: #fff;
  }
`;

export default Btn;

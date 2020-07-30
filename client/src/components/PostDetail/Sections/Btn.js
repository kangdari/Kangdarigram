import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";

import Save from "../../Common/Save";

const Btn = ({ postId }) => {
  return (
    <BtnBlock>
      <FontAwesomeIcon className="btn" icon={faHeart} />
      <FontAwesomeIcon className="btn" icon={faComment} />
      <Save postId={postId} />
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

  svg {
    font-size: 24px;
    stroke: black;
    stroke-width: 35;
  }
`;

export default Btn;

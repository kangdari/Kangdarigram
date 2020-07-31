import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

import Save from "../../Common/Save";
import Like from "../../Common/Like";

const Btn = ({ postId }) => {
  return (
    <BtnBlock>
      <Like postId={postId} />
      {/* <FontAwesomeIcon className="btn" icon={faHeart} /> */}
      <FontAwesomeIcon className="btn" icon={faComment} />
      <Save postId={postId} />
    </BtnBlock>
  );
};

const BtnBlock = styled.section`
  display: flex;
  align-items: center;
  padding: 0 8px;
  margin-top: 4px;

  .btn {
    margin: 8px;
    cursor: pointer;
  }

  svg {
    font-size: 24px;
  }
`;

export default Btn;

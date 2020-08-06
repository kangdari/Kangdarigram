import React from "react";
import styled from "styled-components";

import Save from "../../Common/Save";
import Like from "../../Common/Like";
import Comment from "../../Common/Comment";

const Btn = ({ postId }) => {
  return (
    <BtnBlock>
      <Like postId={postId} _size={"large"} />
      <Comment _size={"large"} />
      <Save postId={postId} _size={"large"} />
    </BtnBlock>
  );
};

const BtnBlock = styled.section`
  display: flex;
  align-items: center;
  padding: 0 16px;
  margin-top: 4px;
`;

export default Btn;

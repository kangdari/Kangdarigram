import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Loading = () => {
  // return <LoadingBlock>loading...</LoadingBlock>;
  return (
    <LoadingBlock>
      <FontAwesomeIcon icon={faSpinner} />
    </LoadingBlock>
  );
};

const LoadingBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-size: 50px;
`;

export default Loading;

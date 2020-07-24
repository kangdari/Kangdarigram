import React from 'react';
import styled from 'styled-components';

const HomePage = () => {
  return (
    <>
      <HomePageCondtainer>
        <h2>HomePage</h2>
      </HomePageCondtainer>
    </>
  );
};

const HomePageCondtainer = styled.div`
  width: 100%;
  height: 200vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default HomePage;

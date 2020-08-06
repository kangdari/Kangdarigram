import React, { useEffect } from "react";
import styled from "styled-components";
import UserList from "./Section/UserList";
import PostList from "./Section/PostList";

const HomePage = () => {
  // 전체 포스트 불러오기
  useEffect(() => {}, []);

  return (
    <HomePageContainer>
      <ContentContainer>
        <ContentsBlock>
          <UserList />
          <PostList />
          <PostList />
        </ContentsBlock>
        <AsideContainer>asdie</AsideContainer>
      </ContentContainer>
    </HomePageContainer>
  );
};

const HomePageContainer = styled.main`
  width: 100%;
  height: 200vh;
  margin-top: 90px;
`;

const ContentContainer = styled.section`
  position: relative;
  max-width: 935px;
  margin: 0 auto;
  display: flex;
`;

const ContentsBlock = styled.div`
  max-width: 614px;
  width: 100%;

  @media screen and (max-width: 1000px) {
    margin: 0 auto;
  }
`;

const AsideContainer = styled.div`
  position: fixed;
  height: 100vh;
  /*  조정 필요 */
  top: 88px;
  right: 400px;

  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

export default HomePage;

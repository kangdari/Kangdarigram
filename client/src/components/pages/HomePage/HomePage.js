import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import UserList from "./Section/UserList";
import PostList from "./Section/PostList";

import { loadPostList } from "../../../_actions/post_action";

const HomePage = () => {
  const dispatch = useDispatch();
  const { home_post_list } = useSelector((state) => state.posts);
  // 전체 포스트 불러오기
  // limit, skip 옵션 필요
  useEffect(() => {
    dispatch(loadPostList());
  }, [dispatch]);

  return (
    <HomePageContainer>
      <ContentContainer>
        <ContentsBlock>
          <UserList />
          {home_post_list.map((post) => (
            <PostList key={post._id} post={post} />
          ))}
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

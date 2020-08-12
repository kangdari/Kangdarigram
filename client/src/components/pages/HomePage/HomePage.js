import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import UserList from "./Section/UserList";
import PostList from "./Section/PostList";
import Modal from "../../Common/Modal";
import PostDetail from "../../PostDetail/PostDetail";
import PostOptionModal from "./Section/PostOptionModal";

import { loadPostList } from "../../../_actions/post_action";
import { loadUserList } from "../../../_actions/user_action";

const HomePage = () => {
  const dispatch = useDispatch();
  const { home_post_list } = useSelector((state) => state.posts);
  const [visible, setVisible] = useState(false); // Modal 렌더링 여부
  const [post, setPost] = useState([]); // 선택한 post 상세 보기
  const [postOptionInfo, setPostOptionInfo] = useState({}); // postOptionButton 클릭 시

  // 전체 포스트 불러오기
  // limit, skip 옵션 필요
  useEffect(() => {
    dispatch(loadPostList());
    dispatch(loadUserList()); // userList 가져오기
  }, [dispatch]);

  // 모달 on, clickedPost update
  //usecallback?
  const onClickPost = (postId) => {
    const post = home_post_list.find((post) => post._id === postId);
    setPost(post);
    onOpenModal();
  };

  const onClickPostOption = (info) => {
    setPostOptionInfo(info);
    onOpenModal();
  };

  const onOpenModal = () => {
    setVisible(true);
  };

  // 모달 off
  const onCloseModal = () => {
    setVisible(false);
    setPost([]);
  };

  return (
    <HomePageContainer>
      <ContentContainer>
        <ContentsBlock>
          <UserList />
          {home_post_list.map((post) => (
            <PostList
              key={post._id}
              post={post}
              onClickPost={onClickPost}
              onClickPostOption={onClickPostOption}
            />
          ))}
        </ContentsBlock>
        <AsideContainer>asdie</AsideContainer>
      </ContentContainer>
      {/* post_modal */}
      {visible ? (
        <Modal
          visible={visible}
          onCloseModal={onCloseModal}
          closable={true} // 모달 종료 버튼 클릭 시 끄기 옵션
          maskClosable={true} // 모달 배경 클릭 시 끄기 옵션
          type={"post_modal"}
        >
          {/* 조건 분기 // 글 수정 or 글 상세 보기 */}
          {post.length !== 0 ? (
            <PostDetail post={post} type={"home_post"} />
          ) : (
            <PostOptionModal
              onCloseModal={onCloseModal}
              postOptionInfo={postOptionInfo}
            />
          )}
          {/* <PostDetail post={post} type={"home_post"} /> */}
        </Modal>
      ) : null}
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

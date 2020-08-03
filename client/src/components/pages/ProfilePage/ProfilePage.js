import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import ProfileInfo from "./Section/ProfileInfo";
import ProfileLink from "./Section/ProfileLink";
import ProfilePost from "./Section/ProfilePost";
import Modal from "../../Common/Modal";
import PostDetail from "../../PostDetail/PostDetail";

import { getPostList, getSavedPostList } from "../../../_actions/post_action";

const ProfilePage = ({ location }) => {
  const dispatch = useDispatch();
  const { posts, savedPosts } = useSelector((state) => state.posts);

  const [clickedPost, setClickedPost] = useState(""); // 클릭한 포스트의 index
  const [visible, setVisible] = useState(false); // Modal 렌더링 여부
  const { _id, id } = useSelector((state) => state.user.userData);

  useEffect(() => {
    // 비동기 처리와 로딩 상태를 추가하여 전체 Post를 로드 한 뒤에
    // 다음 작업들이 이루어지도록 작성
    const getPosts = () => {
      dispatch(getPostList({ _id }));
    };

    const getSavedPosts = () => {
      dispatch(getSavedPostList({ _id }));
    };

    if (location.pathname === `/${id}`) {
      getPosts();
    } else if (location.pathname === `/${id}/saved`) {
      getSavedPosts();
    }
  }, [id, location.pathname, _id, dispatch]);

  // 모달 on, clickedPost update
  const onClickPost = (index) => {
    setClickedPost(index);
    setVisible(true);
  };

  // 모달 off
  const onCloseModal = () => {
    setVisible(false);
  };

  return (
    <ProfilePageBlock>
      <ProfileInfo />
      <ProfileLink />

      <ProfilePost
        posts={location.pathname === `/${id}/saved` ? savedPosts : posts}
        onClickPost={onClickPost}
      />
      {visible ? (
        <Modal
          visible={visible}
          onCloseModal={onCloseModal}
          closable={true} // 모달 종료 버튼 클릭 시 끄기 옵션
          maskClosable={true} // 모달 배경 클릭 시 끄기 옵션
          type={"post_modal"}
        >
          <PostDetail id={id} post={posts[clickedPost]} />
        </Modal>
      ) : null}
    </ProfilePageBlock>
  );
};

const ProfilePageBlock = styled.main`
  max-width: 935px;
  width: 100%;
  margin: 90px auto 0 auto;
  padding: 20px 20px 0;

  @media screen and (max-width: 736px) {
    padding: 20px 0 0;
  }
`;

export default ProfilePage;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import ProfileInfo from "./Section/ProfileInfo";
import ProfileLink from "./Section/ProfileLink";
import ProfilePost from "./Section/ProfilePost";
import Modal from "../../Common/Modal";
import PostDetail from "../../PostDetail/PostDetail";

import { getPostList, getSavedPostList } from "../../../_actions/post_action";
import axios from "axios";

const ProfilePage = ({ location, match }) => {
  const dispatch = useDispatch();
  const { posts, savedPosts } = useSelector((state) => state.posts);

  const [clickedPost, setClickedPost] = useState(""); // 클릭한 포스트의 index
  const [visible, setVisible] = useState(false); // Modal 렌더링 여부
  const { _id, id } = useSelector((state) => state.user.userData); // 현재 사용자 정보
  const [currentUser, setCurrentUser] = useState(""); // 현재 조회 중인 프로필의 user의 정보

  useEffect(() => {
    const userId = match.params.userId;
    // 조회 중인 프로필의 유저 정보 가져오기
    axios
      .post("/api/users/get-user-id", { userId })
      .then((res) => setCurrentUser(res.data.userInfo[0]));
  }, [match.params.userId]);

  useEffect(() => {
    // 비동기 처리와 로딩 상태를 추가하여 전체 Post를 로드 한 뒤에
    // 다음 작업들이 이루어지도록 작성
    const getPosts = async () => {
      dispatch(getPostList({ _id: currentUser._id }));
    };

    const getSavedPosts = async () => {
      dispatch(getSavedPostList({ _id: currentUser._id }));
    };
    if (location.pathname === `/${currentUser.id}`) {
      getPosts();
    } else if (location.pathname === `/${currentUser.id}/saved`) {
      getSavedPosts();
    }
  }, [id, location.pathname, _id, dispatch, currentUser]);

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
      <ProfileInfo user={currentUser} />
      <ProfileLink user={currentUser} />

      <ProfilePost
        posts={
          location.pathname === `/${currentUser.id}/saved` ? savedPosts : posts
        }
        onClickPost={onClickPost}
        savedPost={location.pathname === `/${currentUser.id}/saved`}
      />
      {visible ? (
        <Modal
          visible={visible}
          onCloseModal={onCloseModal}
          closable={true} // 모달 종료 버튼 클릭 시 끄기 옵션
          maskClosable={true} // 모달 배경 클릭 시 끄기 옵션
          type={"post_modal"}
        >
          <PostDetail
            post={
              location.pathname === `/${currentUser.id}/saved`
                ? savedPosts[clickedPost]
                : posts[clickedPost]
            }
            savedPost={location.pathname === `/${currentUser.id}/saved`}
          />
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

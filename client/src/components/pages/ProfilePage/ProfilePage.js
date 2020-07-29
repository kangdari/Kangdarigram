import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ProfileInfo from "./Section/ProfileInfo";
import ProfileLink from "./Section/ProfileLink";
import ProfilePost from "./Section/ProfilePost";
import Modal from "../../Common/Modal";
import PostDetail from "../../PostDetail/PostDetail";

import { loadPost, loadSavedPost } from "../../../api/post";

const ProfilePage = ({ location }) => {
  const [posts, setPosts] = useState([]); // 유저가 작성한 post 정보
  const [clickedPost, setClickedPost] = useState(""); // 클릭한 포스트의 index
  const [visible, setVisible] = useState(false); // Modal 렌더링 여부
  const { _id, id } = useSelector((state) => state.user.userData);

  // 서버에서 유저가 쓴 게시글에 대한 정보를 긁어옴
  useEffect(() => {
    const body = {
      _id,
    };
    if (location.pathname === `/${id}`) {
      loadPost(body).then((res) => {
        if (res.data.success) {
          setPosts(res.data.postInfo);
        }
      });
    } else if (location.pathname === `/${id}/saved`) {
      loadSavedPost(body).then((res) => {
        if (res.data.success) {
          setPosts(res.data.savedPostInfo);
        }
      });
    }
  }, [id, _id, location.pathname]);

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
      <ProfilePost posts={posts} onClickPost={onClickPost} />
      {visible ? (
        <Modal
          visible={visible}
          onCloseModal={onCloseModal}
          closable={true} // 모달 종료 버튼 클릭 시 끄기 옵션
          maskClosable={true} // 모달 배경 클릭 시 끄기 옵션
        >
          <PostDetail post={posts[clickedPost]} />
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

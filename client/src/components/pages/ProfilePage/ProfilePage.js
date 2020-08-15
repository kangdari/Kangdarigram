import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ProfileInfo from "./Section/ProfileInfo";
import ProfileLink from "./Section/ProfileLink";
import ProfilePost from "./Section/ProfilePost";
import Modal from "../../Common/Modal";
import PostDetail from "../../PostDetail/PostDetail";
import Loading from "../../Common/Loading";

import { getProfilePostList } from "../../../_actions/post_action";
import axios from "axios";

const ProfilePage = ({ match }) => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const { loading } = useSelector((state) => state.loading);
  const [clickedPost, setClickedPost] = useState(""); // 클릭한 포스트의 index
  const [visible, setVisible] = useState(false); // Modal 렌더링 여부
  const [currentUser, setCurrentUser] = useState(""); // 현재 조회 중인 프로필의 user의 정보
  const [error, setError] = useState(false);

  useEffect(() => {
    const userId = match.params.userId;
    // 조회 중인 프로필의 유저 정보 가져오기
    axios.post("/api/users/get-user-id", { userId }).then((res) => {
      const userInfo = res.data.userInfo[0];
      if (!userInfo) {
        setError(true);
      } else {
        setCurrentUser(res.data.userInfo[0]);
      }
    });
  }, [match.params.userId]);

  // 최초 포스트 로딩
  useEffect(() => {
    dispatch(getProfilePostList({ _id: currentUser._id }));
  }, [dispatch, currentUser._id]);

  // 모달 on, clickedPost update
  const onClickPost = (index) => {
    setClickedPost(index);
    setVisible(true);
  };

  // 모달 off
  const onCloseModal = () => {
    setVisible(false);
  };

  // 존재하지 않는 유저의 프로필 접근 시
  if (error) {
    return (
      <ErrorBlock>
        <div className="error_container">
          <ErrorTitle>죄송합니다. 페이지를 사용할 수 없습니다.</ErrorTitle>
          <ErrorDesc>
            클릭하신 링크가 잘못되었거나 페이지가 삭제되었습니다.{" "}
            <Link className="link" to="/">
              Home으로 돌아가기
            </Link>
          </ErrorDesc>
        </div>
      </ErrorBlock>
    );
  }

  if (!loading && currentUser) {
    return (
      <ProfilePageBlock>
        <ProfileInfo user={currentUser} />
        <ProfileLink user={currentUser} />
        <ProfilePost
          posts={posts}
          onClickPost={onClickPost}
          type={"profile_post"}
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
              post={posts[clickedPost]}
              postDetailModalClose={onCloseModal}
              type={"profile_post"}
            />
          </Modal>
        ) : null}
      </ProfilePageBlock>
    );
  } else {
    return <Loading />;
  }
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

const ErrorBlock = styled.main`
  margin-top: 90px;
  text-align: center;

  .error_container {
    max-width: 1200px;
    margin: 0 auto;
  }
`;

const ErrorTitle = styled.h1`
  font-size: 24px;
  font-weight: 500;
  margin: 30px 0;
`;

const ErrorDesc = styled.p`
  font-size: 16px;

  .link {
    color: #00376b;
  }
`;

export default ProfilePage;

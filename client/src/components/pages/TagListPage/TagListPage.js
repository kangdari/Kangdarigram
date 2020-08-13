import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import palette from "../../../utils/palette";

import { loadTagPostList } from "../../../_actions/post_action";
import Loading from "../../Common/Loading";
import Modal from "../../Common/Modal";
import ProfilePost from "../ProfilePage/Section/ProfilePost";
import PostDetail from "../../PostDetail/PostDetail";
import TagInfo from "./Section/TagInfo";

const TagListPage = ({ match }) => {
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.posts.tag_post_list);
  const { loading } = useSelector((state) => state.loading);
  const [clickedPost, setClickedPost] = useState(""); // 클릭한 포스트의 index
  const [visible, setVisible] = useState(false); // Modal 렌더링 여부
  const { tag } = match.params;

  // 모달 on, clickedPost update
  const onClickPost = (index) => {
    setClickedPost(index);
    setVisible(true);
  };

  // 모달 off
  const onCloseModal = () => {
    setVisible(false);
  };

  useEffect(() => {
    dispatch(loadTagPostList(tag));
  }, [dispatch, tag]);

  if (!loading && postList.length === 0) {
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

  if (!loading) {
    return (
      <TagListPageBlock>
        <TagInfo tag={tag} postCount={postList.length} />
        <Title>게시글</Title>
        <ProfilePost
          posts={postList}
          onClickPost={onClickPost}
          type="tag_post"
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
              post={postList[clickedPost]}
              postDetailModalClose={onCloseModal}
              type={"tag_post"}
            />
          </Modal>
        ) : null}
      </TagListPageBlock>
    );
  } else {
    return <Loading />;
  }
};

const Title = styled.h2`
  font-size: 14px;
  font-weight: 600;
  margin: 20px 0;
  color: ${palette.gray[6]};
`;

const TagListPageBlock = styled.div`
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

export default TagListPage;

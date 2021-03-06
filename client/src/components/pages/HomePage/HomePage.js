import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useLayoutEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import UserList from "./Section/UserList";
import PostList from "./Section/PostList";
import Modal from "../../Common/Modal";
import PostDetail from "../../PostDetail/PostDetail";
import PostOptionModal from "./Section/PostOptionModal";
import Aside from "./Section/Aside";

import { loadPostList } from "../../../_actions/post_action";
import { loadUserList } from "../../../_actions/user_action";

const HomePage = () => {
  const dispatch = useDispatch();
  const { home_post_list, home_post_end } = useSelector((state) => state.posts);
  const { loading } = useSelector((state) => state.loading); // loadPostList() 로딩 여부
  const [visible, setVisible] = useState(false); // Modal 렌더링 여부
  const [post, setPost] = useState([]); // 선택한 post 상세 보기
  const [postOptionInfo, setPostOptionInfo] = useState({}); // postOptionButton 클릭 시
  // db option
  const [state, setState] = useState({
    skip: 0,
    limit: 6,
  });
  // IO target
  const [target, setTarget] = useState(null);
  const blockRef = useRef(null);
  const asideRef = useRef(null);
  const [right, setRight] = useState();

  // ContentsBlock right 좌표값 구하기
  useLayoutEffect(() => {
    const getRightLocation = () => {
      const target = blockRef.current;
      const rightLocation = target.getBoundingClientRect().right;
      setRight(rightLocation);
    };

    window.addEventListener("resize", getRightLocation);
    getRightLocation();
    // 자식 컴포넌트인 Aside의 left 위치 값 설정
    asideRef.current.style.left = `${right + 40}px`;
    return () => window.removeEventListener("resize", getRightLocation);
  }, [right]);

  const load = useCallback(() => {
    if (home_post_list.length === 0) {
      dispatch(loadPostList(state));
    }
    dispatch(loadUserList()); // userList 가져오기
  }, [dispatch, home_post_list.length, state]);

  // 전체 포스트 불러오기
  // limit, skip 옵션 필요
  useEffect(() => {
    load();
  }, [load]);

  // 모달 on, clickedPost update
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
    document.body.style.cssText = `overflow: auto`;
  };

  const loadMorePost = useCallback(async () => {
    const newSkip = state.skip + state.limit;
    const body = { skip: newSkip, limit: state.limit };
    await dispatch(loadPostList(body));
    setState({
      ...state,
      skip: newSkip,
    });
  }, [dispatch, state]);

  const handleIntersection = useCallback(
    async ([entry], observer) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        // 추가 데이터
        await loadMorePost();
        observer.observe(entry.target);
      }
    },
    [loadMorePost],
  );

  // observer
  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.01,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target, handleIntersection]);

  return (
    <HomePageContainer>
      <Helmet>
        <title>Kangdarigram</title>
      </Helmet>
      <ContentContainer>
        <ContentsBlock ref={blockRef}>
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
        <Aside ref={asideRef} />
      </ContentContainer>
      {/* 전체 post 로딩이 끝나고 아직 데이터가 남았을 때 */}
      {!loading && !home_post_end && (
        <IntersectionObserverLoadingBlock ref={setTarget} />
      )}
      {/* post_modal */}
      {visible ? (
        <Modal
          visible={visible}
          onCloseModal={onCloseModal}
          closable={true} // 모달 종료 버튼 클릭 시 끄기 옵션
          maskClosable={true} // 모달 배경 클릭 시 끄기 옵션
          type={"post_modal"}
        >
          {/* 조건 분기 // 글 상세 보기 or 옵션 모달 */}
          {post.length !== 0 ? (
            <PostDetail post={post} type={"home_post"} />
          ) : (
            <PostOptionModal
              onCloseModal={onCloseModal}
              postOptionInfo={postOptionInfo}
            />
          )}
        </Modal>
      ) : null}
    </HomePageContainer>
  );
};

const IntersectionObserverLoadingBlock = styled.div`
  height: 100px;
  margin: 0 auto;
  background: transparent;
`;

const HomePageContainer = styled.main`
  width: 100%;
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

export default HomePage;

import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Modal from "../../Common/Modal";
import LikeUserModal from "./LikeUserModal";

const LikeCount = ({ postId }) => {
  const likeInfo = useSelector(
    (state) => state.posts.posts.find((post) => post._id === postId).like,
  );
  const [visible, setVisible] = useState(false); // Modal 렌더링
  const [likeUserList, setLikeUserList] = useState([]);

  // 모달 off
  const onCloseModal = useCallback(() => {
    setVisible(false);
  }, []);

  // 모달 on, 선택한 코멘트 id
  const onOpenLikeModal = useCallback(() => {
    const userList = likeInfo.map((like) => ({
      id: like.userId.id,
      name: like.userId.name,
      // 프로필 사진
    }));
    setLikeUserList(userList);
    console.log(userList);
    setVisible(true);
  }, [likeInfo]);

  return (
    <LikeBlock>
      <button className="like_btn" onClick={onOpenLikeModal}>
        좋아요 <span>{likeInfo && likeInfo.length} 개</span>
      </button>
      {visible ? (
        <Modal
          visible={visible}
          onCloseModal={onCloseModal}
          closable={true} // 모달 종료 버튼 클릭 시 끄기 옵션
          maskClosable={true} // 모달 배경 클릭 시 끄기 옵션
          type={"show_like_user_modal"}
        >
          {/* 모달 안에 넣을 박 스 내용 컴포넌트 제작 */}
          <LikeUserModal likeUserList={likeUserList} />
        </Modal>
      ) : null}
    </LikeBlock>
  );
};

const LikeBlock = styled.section`
  padding: 0 16px;
  margin-top: 4px;
  .like_btn {
    font-weight: 600;
    border: none;
    outline: none;
    cursor: pointer;
    background: transparent;
  }
`;

export default LikeCount;

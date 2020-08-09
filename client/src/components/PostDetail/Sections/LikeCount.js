import React, { useState, useCallback } from "react";
import styled from "styled-components";
import Modal from "../../Common/Modal";
import LikeUserModal from "./LikeUserModal";

const LikeCount = ({ likeInfo }) => {
  const [visible, setVisible] = useState(false); // Modal 렌더링

  // 모달 off
  const onCloseModal = useCallback(() => {
    setVisible(false);
  }, []);

  // 모달 on, 선택한 코멘트 id
  const onOpenLikeModal = useCallback(() => {
    setVisible(true);
  }, []);

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
          <LikeUserModal likeInfo={likeInfo} />
        </Modal>
      ) : null}
    </LikeBlock>
  );
};

const LikeBlock = styled.section`
  padding: 0 16px;
  margin: 4px 0;
  .like_btn {
    font-weight: 600;
    border: none;
    outline: none;
    cursor: pointer;
    background: transparent;
  }
`;

export default LikeCount;

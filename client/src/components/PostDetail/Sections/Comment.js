import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import styled from "styled-components";
import palette from "../../../utils/palette";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import Like from "../../Common/Like";
import Modal from "../../Common/Modal";
import LikeUserModal from "./LikeUserModal";

const Comment = ({ comment, postId, onOpenModal }) => {
  const { contents, writer, _id } = comment;
  const [likeInfo, setLikeInfo] = useState([]);
  const [visible, setVisible] = useState(false); // Modal 렌더링 여부
  const [likeUserList, setLikeUserList] = useState([]);

  useEffect(() => {
    axios
      .post("/api/like/get-comment-like", { commentId: _id })
      .then((res) => setLikeInfo(res.data.like));
  }, [_id]);

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

  const onFocus = () => {
    document.querySelector(".textarea").focus();
    // userToId 전달???
  };

  useEffect(() => {
    axios
      .post("/api/like/get-comment-like", { commentId: _id })
      .then((res) => setLikeInfo(res.data.like));
  }, [_id]);

  // 좋아요를 누른 유저 리스트
  // const onShowLike = () => {
  //   const userList = likeInfo.map((like) => like.userId.id);
  //   console.log(userList);
  // };

  return (
    <CommentItem>
      <li className="comment_box">
        <div className="user">
          <StyledIcon icon={faUserCircle} />
          <div className="info">
            <h3 className="user_name">{writer.id}</h3>
            <span>{contents}</span>
            <div className="info_btns">
              <span>1분</span>
              {likeInfo.length !== 0 ? (
                <button className="btn" onClick={onOpenLikeModal}>
                  좋아요 {likeInfo.length}개
                </button>
              ) : null}
              <button className="btn" onClick={onFocus}>
                댓글 달기
              </button>
            </div>
            {/* 좋아요 */}
            <div className="likeBtn">
              <Like postId={postId} commentId={_id} />
            </div>
          </div>
        </div>
        <HoverBox className="hover_box">
          <button onClick={() => onOpenModal(comment)}>
            <FontAwesomeIcon
              aria-label="댓글 옵션"
              className="btn"
              icon={faEllipsisH}
            />
          </button>
        </HoverBox>
      </li>
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
    </CommentItem>
  );
};

const HoverBox = styled.div`
  display: none;
  position: absolute;
  top: 0;
  right: 30px;

  .btn {
    color: ${palette.gray[5]};
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  margin-right: 10px;
  font-size: 35px;
  color: lightgrey;
  cursor: pointer;
`;

const CommentItem = styled.ul`
  line-height: 20px;
  margin-bottom: 16px;
  overflow-x: hidden;
  word-break: break-all;

  .comment_box {
    position: relative;
  }

  .comment_box:hover .hover_box {
    display: block;
  }

  .user {
    display: flex;
  }

  .info {
    position: relative;
    width: 100%;
    padding-right: 35px;

    .user_name {
      display: inline-flex;
      font-weight: 500;
      padding-right: 5px;
    }

    .info_btns {
      font-size: 12px;
      color: ${palette.gray[5]};
      margin-top: 8px;
    }

    .btn {
      font-size: 12px;
      color: ${palette.gray[5]};
      border: none;
      outline: none;
      background: transparent;
      cursor: pointer;
      margin-left: 6px;
    }
  }

  .likeBtn {
    position: absolute;
    top: 0;
    right: 0;
  }
`;

export default Comment;

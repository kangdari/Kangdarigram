import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import palette from "../../../utils/palette";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import Like from "../../Common/Like";
import Modal from "../../Common/Modal";
import CommentModal from "./CommentModal";

import axios from "axios";

const Comment = ({ comment, postId, onOpenModal }) => {
  const { contents, writer, _id } = comment;
  const [likeCount, setLikeCount] = useState([]);

  const onFocus = () => {
    document.querySelector(".textarea").focus();
    // userToId 전달???
  };

  useEffect(() => {
    axios
      .post("/api/like/get-comment-like-count", { commentId: _id })
      .then((res) => setLikeCount(res.data.like.length));
  }, [_id]);

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
              {likeCount ? (
                <button className="btn"> 좋아요 {likeCount}개</button>
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

// Tag 클릭시 /expolore/tag/{이름}으로 이동하고
// 해당 페이지에서 검색 수행하여 결과물 렌더링 ???
const Tag = ({ tag }) => {
  return <TagLink to={`/explore/tag/${tag}`}>#{tag}</TagLink>;
};

const Comments = ({ comment, postContents, tags, writer, postId }) => {
  const [visible, setVisible] = useState(false); // Modal 렌더링 여부
  const [clickedComment, setClickedComment] = useState();

  // 모달 off
  const onCloseModal = useCallback(() => {
    setVisible(false);
  }, []);

  // 모달 on, 선택한 코멘트 id
  const onOpenModal = useCallback((comment) => {
    setVisible(true);
    setClickedComment(comment);
  }, []);

  return (
    <CommentsBlock>
      <CommentItem>
        <li>
          <div className="user">
            <StyledIcon icon={faUserCircle} />
            <div className="info">
              <h3>{writer.id}</h3>
              <span>{postContents}</span>
              <div>
                {tags.map((tag, index) => (
                  <Tag key={index} tag={tag} />
                ))}
              </div>
            </div>
          </div>
        </li>
      </CommentItem>
      {comment.map((_comment) => (
        <Comment
          key={_comment._id}
          comment={_comment}
          postId={postId}
          onOpenModal={onOpenModal}
        />
      ))}
      {visible ? (
        <Modal
          visible={visible}
          onCloseModal={onCloseModal}
          closable={true} // 모달 종료 버튼 클릭 시 끄기 옵션
          maskClosable={true} // 모달 배경 클릭 시 끄기 옵션
          type={"comment_option_modal"}
        >
          {/* 모달 안에 넣을 박 스 내용 컴포넌트 제작 */}
          <CommentModal
            postId={postId}
            comment={clickedComment}
            onCloseModal={onCloseModal}
          />
        </Modal>
      ) : null}
    </CommentsBlock>
  );
};

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

const CommentsBlock = styled.div`
  padding: 16px;
  border-bottom: 1px solid ${palette.gray[3]};
  flex-grow: 1;
  overflow: auto;

  @media screen and (max-width: 736px) {
    display: none;
  }
`;

const TagLink = styled(Link)`
  color: #00376b;
  padding: 2px;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  margin-right: 10px;
  font-size: 35px;
  color: lightgrey;
  cursor: pointer;
`;

export default Comments;

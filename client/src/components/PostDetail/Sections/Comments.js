import React, { useState, useCallback } from "react";
import styled from "styled-components";
import palette from "../../../utils/palette";
import { Link } from "react-router-dom";

import Modal from "../../Common/Modal";
import UserIcon from "../../Common/UserIcon";
import CommentModal from "./CommentModal";
import Comment from "./Comment";

const Tag = ({ tag }) => {
  const clickHandler = () => {
    document.body.style.cssText = `overflow: auto`;
  };

  return (
    <TagLink to={`/explore/tags/${tag}`} onClick={clickHandler}>
      #{tag}
    </TagLink>
  );
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
            <div>
              <UserIcon id={writer.id} image={writer.image} size={"small"} />
            </div>
            <div className="info">
              <h3>{writer.id}</h3>
              <span>{postContents}</span>
              <div>
                {tags.length > 0 &&
                  tags.map((tag, index) => <Tag key={index} tag={tag} />)}
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
    margin-left: 16px;

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

export default Comments;

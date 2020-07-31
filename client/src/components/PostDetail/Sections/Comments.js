import React from "react";
import styled from "styled-components";
import palette from "../../../utils/palette";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import Like from "../../Common/Like";

const Comment = ({ comment, postId }) => {
  const { contents, writer, _id } = comment;

  const onFocus = () => {
    document.querySelector(".textarea").focus();
    // userToId 전달???
  };

  return (
    <CommentItem>
      <li>
        <div className="user">
          <StyledIcon icon={faUserCircle} />
          <div className="info">
            <h3 className="user_name">{writer.id}</h3>
            <span>{contents}</span>
            <div className="info_btns">
              <span>1분</span>
              <button className="btn">좋아요</button>
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
      </li>
    </CommentItem>
  );
};

// Tag 클릭시 /expolore/tag/{이름}으로 이동하고
// 해당 페이지에서 검색 수행하여 결과물 렌더링 ???
const Tag = ({ tag }) => {
  return <TagLink to={`/explore/tag/${tag}`}>#{tag}</TagLink>;
};

const Comments = ({ comment, postContents, tags, writer, postId }) => {
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
        <Comment key={_comment._id} comment={_comment} postId={postId} />
      ))}
    </CommentsBlock>
  );
};

const CommentItem = styled.ul`
  line-height: 20px;
  margin-bottom: 16px;
  overflow-x: hidden;
  word-break: break-all;

  .user {
    display: flex;
  }

  .info {
    position: relative;
    width: 100%;
    padding-right: 20px;

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

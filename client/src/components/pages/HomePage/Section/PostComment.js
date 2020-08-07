import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Like from "../../../Common/Like";
import Tag from "../../../Common/Tag";

const Comment = ({ comment }) => {
  return (
    <CommentBlock>
      <Link to={`/${comment.writer.id}`} className="id">
        {comment.writer.id}
      </Link>
      <span>{comment.contents}</span>
      <Like commentId={comment._id} className="like_icon" />
    </CommentBlock>
  );
};

const Contents = ({ post }) => {
  const { contents, tags, writer } = post;
  const [more, setMore] = useState(false);

  // 더보기 버튼
  const moreView = () => {
    setMore(true);
  };

  return (
    <ContentsBlock>
      <span className="id">
        <Link to={`/${writer.id}`}>{writer.id}</Link>
      </span>
      {contents.length > 10 && !more ? (
        <>
          <span>{contents.slice(0, 10)}...</span>
          <button onClick={moreView}>더보기</button>
        </>
      ) : (
        <>
          <span>{contents}</span>
          <div>
            {tags.map((tag, index) => (
              <Tag tag={tag} key={index} />
            ))}
          </div>
        </>
      )}
    </ContentsBlock>
  );
};

const PostComment = ({ post, comment, onClickPost }) => {
  return (
    <PostCommentBlock>
      <div>
        <Contents post={post} />
        {comment && comment.length > 2 ? (
          <button
            className="more_comment_modal"
            onClick={() => onClickPost(post._id)}
          >
            {comment.length - 2}개 댓글 더보기
          </button>
        ) : null}
        {comment &&
          comment
            .slice(0, 2)
            .map((comment) => <Comment key={comment._id} comment={comment} />)}
      </div>
    </PostCommentBlock>
  );
};

const ContentsBlock = styled.div`
  margin-bottom: 4px;
`;

const CommentBlock = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;

  .like_icon {
    margin-left: auto;
  }
`;

const PostCommentBlock = styled.section`
  padding: 0 16px;

  .more_comment_modal {
    margin-bottom: 4px;
  }

  .id {
    font-weight: 500;
    margin-right: 5px;
  }
`;

export default PostComment;

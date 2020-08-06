import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Like from "../../../Common/Like";

const Comment = ({ comment }) => {
  return (
    <CommentBlock>
      <span className="id">{comment.writer.id}</span>
      <span>{comment.contents}</span>
      <Like commentId={comment._id} className="like_icon" />
    </CommentBlock>
  );
};

const Contents = ({ post }) => {
  const { contents, tags, writer } = post;

  return (
    <ContentsBlock>
      <span className="id">
        <Link to={`/${writer.id}`}>{writer.id}</Link>
      </span>
      <span>
        {contents.length > 10 ? (
          <>
            <span>${contents.slice(0, 10)}...</span>
            <button>더보기</button>
          </>
        ) : (
          <span>{contents}</span>
        )}
        {/* 더보기 누르면 추가 내용 추가 */}
        {/* <span>contents 내용</span>  */}
      </span>
    </ContentsBlock>
  );
};

const PostComment = ({ post, commentInfo }) => {
  return (
    <PostCommentBlock>
      <div>
        <Contents post={post} />
        {/* modal open 이벤트 추가 */}
        {/* modal의 자식으로 postDetail 컴포넌트 호출 */}
        <div className="more_comment_modal">댓글 더보기</div>
        {commentInfo.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
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

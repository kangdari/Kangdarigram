import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Like from "../../../Common/Like";

const Comment = () => {
  return (
    <CommentBlock>
      <span className="id">id</span>
      <span>댓글 내용adfasdf</span>
      <Like className="like_icon" />
    </CommentBlock>
  );
};

const CommentBlock = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;

  .like_icon {
    margin-left: auto;
  }
`;

const Contents = () => {
  return (
    <ContentsBlock>
      <span className="id">
        <Link to="#">writer_id</Link>
      </span>
      <span>
        <span>contents 내용</span>
        {""}
        <button>...더보기</button>
        {/* 더보기 누르면 추가 내용 추가 */}
        {/* <span>contents 내용</span>  */}
      </span>
    </ContentsBlock>
  );
};

const ContentsBlock = styled.div`
  margin-bottom: 4px;
`;

const PostComment = () => {
  return (
    <PostCommentBlock>
      <div>
        <Contents />
        {/* modal open 이벤트 추가 */}
        {/* modal의 자식으로 postDetail 컴포넌트 호출 */}
        <div className="more_comment_modal">댓글 더보기</div>
        <Comment />
        <Comment />
        <Comment />
      </div>
    </PostCommentBlock>
  );
};

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

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import palette from "../../../utils/palette";

import { saveComment } from "../../../_actions/comment_action";

const WriteComment = ({ userId, postId, type }) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [btn, setBtn] = useState(true); // 버튼 활성화 여부

  const onChangeHandler = (e) => {
    setInput(e.currentTarget.value);
  };

  const onCheckHandler = () => {
    input.length >= 1 ? setBtn(false) : setBtn(true);
  };

  const onSaveComment = () => {
    const commentBody = {
      contents: input,
      writer: userId,
      postId,
      type,
    };

    dispatch(saveComment(commentBody));
    // Homepage 사용
    // if (getComment) getComment();
    setInput("");
  };

  const onCheckEnter = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      if (e.currentTarget.value.length > 0) {
        e.preventDefault();
        onSaveComment();
      }
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    onSaveComment();
  };

  return (
    <WriteCommentBlock>
      <form onSubmit={onSubmitHandler}>
        <textarea
          value={input}
          onChange={onChangeHandler}
          onKeyUp={onCheckHandler}
          onKeyDown={onCheckEnter}
          className="comment_textarea"
          placeholder="댓글 달기..."
        ></textarea>
        <button className="btn" type="submit" disabled={btn}>
          게시
        </button>
      </form>
    </WriteCommentBlock>
  );
};

const WriteCommentBlock = styled.div`
  margin-top: 8px;
  padding: 0 16px;
  border-top: 1px solid ${palette.gray[3]};
  form {
    display: flex;
    height: 50px;
    align-items: center;
  }

  .comment_textarea {
    overflow-y: auto;
    flex: 1;
    font-size: 14px;
    height: 18px;
    max-height: 80px;
    border: none;
    outline: none;
    resize: none;
  }

  .btn {
    color: ${palette.blue[5]};
    cursor: pointer;
    font-weight: 600;
    border: none;
    outline: none;
    background: transparent;
  }

  .btn:disabled {
    color: ${palette.blue[2]};
    pointer-events: none;
  }

  @media screen and (max-width: 736px) {
    border: none;
  }
`;

export default WriteComment;

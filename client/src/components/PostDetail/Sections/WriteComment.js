import React, { useState } from "react";
import styled from "styled-components";
import palette from "../../../utils/palette";

import { saveComment } from "../../../api/comment";

const WriteComment = ({ refreshComments, userId, postId }) => {
  const [input, setInput] = useState("");
  const [btn, setBtn] = useState(true); // 버튼 활성화 여부

  const onChangeHandler = (e) => {
    setInput(e.currentTarget.value);
  };

  const onCheckHandler = () => {
    input.length >= 1 ? setBtn(false) : setBtn(true);
  };

  const onCheckEnter = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      // onSubmitHandler
      setInput("");
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const commentBody = {
      contents: input,
      writer: userId,
      postId,
    };

    saveComment(commentBody).then((res) => {
      if (res.data.success) {
        refreshComments(res.data.commentInfo);
        setInput("");
      } else {
        alert("댓글 달기 실패");
      }
    });
  };

  return (
    <WriteCommentBlock>
      <form onSubmit={onSubmitHandler}>
        <textarea
          value={input}
          onChange={onChangeHandler}
          onKeyUp={onCheckHandler}
          onKeyPress={onCheckEnter}
          className="text"
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

  .text {
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

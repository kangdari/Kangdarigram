import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import FileUplaod from "./Sections/FileUplaod";
import TagBox from "./Sections/TagBox";
import Button from "../../Common/Button";

import { writePost } from "../../../_actions/post_action";
import { useDispatch } from "react-redux";

const WirtePostPage = ({ user, history }) => {
  const dispatch = useDispatch();
  const [contents, setContents] = useState("");
  const [images, setImages] = useState("");
  const [tags, setTags] = useState([]);

  const onChangeHandler = (e) => setContents(e.currentTarget.value);

  const updateImages = useCallback((images) => setImages(images), []);

  const upadateTags = useCallback((tags) => setTags(tags), []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // 예외 처리
    if (!images) {
      return alert("이미지를 올려주세요.");
    }

    const body = {
      writer: user.userData._id,
      contents,
      images,
      tags,
    };

    await dispatch(writePost(body));
    history.push(`/${user.userData.id}`);
  };

  return (
    <WirtePostPageBlock>
      <Helmet>
        <title>글 작성하기</title>
      </Helmet>

      <form onSubmit={onSubmitHandler}>
        <FileUplaod updateImages={updateImages} />
        <TextArea
          value={contents}
          onChange={onChangeHandler}
          placeholder="내용 입력..."
        />
        <TagBox upadateTags={upadateTags} />
        <Button type="submit" blue>
          작성
        </Button>
        <Button to="/" blue>
          취소
        </Button>
      </form>
    </WirtePostPageBlock>
  );
};

const WirtePostPageBlock = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 150px auto 0 auto;
  padding: 0 20px;

  .title {
    text-align: center;
    font-size: 30px;
    font-weight: 500;
    margin: 30px 0;
  }

  button {
    margin-right: 10px;
  }
`;

const TextArea = styled.textarea`
  font-size: 1.2rem;
  width: 100%;
  height: 150px;
  outline: none;
  border: 1px solid lightgrey;
  margin-bottom: 2rem;
  padding: 15px;
  overflow-y: auto;
  border-radius: 4px;
`;

export default WirtePostPage;

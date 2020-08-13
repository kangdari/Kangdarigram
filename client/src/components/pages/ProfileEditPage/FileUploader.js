import React, { useRef } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { uploadUserImg } from "../../../_actions/user_action";

const FileUploader = ({ userId, updateMessage }) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleChange = (e) => {
    const imgFile = e.target.files[0];
    const formData = new FormData();
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    formData.append("file", imgFile);

    // 이미지 저장
    dispatch(uploadUserImg(formData, userId, config));
    updateMessage("프로필 사진이 추가되었습니다.");
  };

  return (
    <>
      <Button onClick={handleClick}>프로필 사진 바꾸기</Button>
      <input
        type="file"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleChange}
        accept="image/png, image/jpeg"
      />
    </>
  );
};

const Button = styled.button`
  color: #0095f6;
  font-weight: 600;
  font-size: 14px;
`;

export default FileUploader;

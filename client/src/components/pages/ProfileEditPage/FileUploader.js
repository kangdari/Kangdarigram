import React, { useRef } from "react";
import styled from "styled-components";

const FileUploader = () => {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleChange = (e) => {
    const imgFile = e.target.files[0];
    console.log(imgFile);
    // 이미지 저장
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

const FileUploaderBlock = styled.div``;

const Button = styled.button`
  color: #0095f6;
  font-weight: 600;
  font-size: 14px;
`;

export default FileUploader;

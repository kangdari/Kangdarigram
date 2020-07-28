import React, { useState } from "react";
import styled from "styled-components";
import Dropzone from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
// import axios from 'axios';
import { uploadImage } from "../../../../api/post";

const FileUplaod = ({ updateImages }) => {
  const [images, setImages] = useState([]);

  const onDropHandler = (files) => {
    const formData = new FormData();
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    formData.append("file", files[0]);

    // 서버 요청
    uploadImage(formData, config).then((res) => {
      // post 등록 성공 시
      if (res.data.uploadSuccess) {
        setImages([...images, res.data.filePath]);
        updateImages([...images, res.data.filePath]); // WirtePostPage에 상태 전달
      } else {
        alert("업로드 실패");
      }
    });
  };

  // 클릭한 이미지 제거 후 상태 업데이트
  const onDeleteHandler = (clickedImage) => {
    const nextImages = images.filter((image) => image !== clickedImage);
    setImages(nextImages);
  };

  return (
    <FileUplaodBlock>
      <Dropzone onDrop={onDropHandler}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div className="drop_box" {...getRootProps()}>
              <input {...getInputProps()} />
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </section>
        )}
      </Dropzone>

      <DropImagesBlock>
        {images.map((image, index) => (
          <img
            key={index}
            src={`http://localhost:5050/${image}`}
            alt="img"
            onClick={() => onDeleteHandler(image)}
          />
        ))}
      </DropImagesBlock>
    </FileUplaodBlock>
  );
};

const FileUplaodBlock = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 40px 0;

  .drop_box {
    width: 350px;
    height: 300px;
    border: 1px solid lightgrey;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 6rem;
    outline: none;
  }
`;

const DropImagesBlock = styled.div`
  display: flex;
  width: 350px;
  height: 300px;
  overflow-x: auto;

  img {
    width: 100%;
  }
`;

export default FileUplaod;

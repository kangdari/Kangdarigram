import React from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const FileUplaod = () => {
  return (
    <FileUplaodBlock>
      <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div className='drop_box' {...getRootProps()}>
              <input {...getInputProps()} />
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </section>
        )}
      </Dropzone>

      {/* <div className='upload_file_zone'></div> */}
    </FileUplaodBlock>
  );
};

const FileUplaodBlock = styled.div`
  margin: 20px 0;

  .drop_box {
    width: 300px;
    height: 300px;
    border: 1px solid lightgrey;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 6rem;
    outline: none;
  }
`;

export default FileUplaod;

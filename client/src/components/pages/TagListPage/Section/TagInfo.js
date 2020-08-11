import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

const TagInfo = ({ tag, postCount }) => {
  return (
    <TagInfoBlock>
      <div className="profile_img">
        <div className="img_box">
          <FontAwesomeIcon className="img" icon={faCircle} />
        </div>
      </div>

      <div className="profile_info">
        <div className="info_header">
          <h1 className="id">#{tag}</h1>
        </div>
        <ul className="profile_list">
          <li>
            게시물 <span className="count">{postCount}</span>
          </li>
        </ul>
      </div>
    </TagInfoBlock>
  );
};

const TagInfoBlock = styled.div`
  display: flex;
  margin-bottom: 40px;

  .profile_img {
    flex: 35%;

    .img_box {
      width: 150px;
      height: 150px;
      margin: 0 auto;
    }
    .img {
      width: 100%;
      height: 100%;
      color: lightgrey;
    }
  }

  .profile_info {
    flex: 65%;

    .info_header {
      display: flex;
      margin-bottom: 20px;

      .id {
        font-size: 28px;
        font-weight: 400;
        margin-right: 15px;
      }
    }
  }

  .profile_list {
    display: flex;
    font-size: 16px;
    margin-bottom: 20px;

    li {
      margin-right: 40px;
    }
    .count {
      font-weight: 500;
    }
  }
`;

export default TagInfo;

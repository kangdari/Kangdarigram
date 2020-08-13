import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { loadPost } from "../../../../api/post";

const ProfileInfo = ({ user }) => {
  // 현재 조회 프로필의 유저
  const { id, name, _id } = user;
  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    let mounted = true;
    loadPost({ _id }).then((res) => {
      if (mounted) setPostCount(res.data.postInfo.length);
    });
    return () => (mounted = false);
  }, [_id]);

  return (
    <ProfileInfoBlock>
      <div className="profile_img">
        <div className="img_box">
          <FontAwesomeIcon className="img" icon={faUserCircle} />
        </div>
      </div>

      <div className="profile_info">
        <div className="info_header">
          <h1 className="id">{id}</h1>
          <Link to="/profile/edit" className="profile_btn">
            프로필 편집
          </Link>
        </div>
        <ul className="profile_list">
          <li>
            게시물 <span className="count">{postCount}</span>
          </li>
        </ul>

        <div className="profile_contents">
          <p className="name">{name}</p>
          <p className="contents">내용</p>
        </div>
      </div>
    </ProfileInfoBlock>
  );
};

const ProfileInfoBlock = styled.div`
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
      .profile_btn {
        font-size: 14px;
        background: transparent;
        border: 1px solid lightgrey;
        padding: 5px 9px;
        border-radius: 4px;
        font-weight: 500;
        cursor: pointer;
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

  .profile_contents {
    font-size: 16px;
    .name {
      font-weight: 500;
      margin-bottom: 10px;
    }
  }
`;

export default ProfileInfo;

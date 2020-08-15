import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { loadPost } from "../../../../api/post";
import UserIcon from "../../../Common/UserIcon";

const ProfileInfo = ({ user }) => {
  // 현재 조회 프로필의 유저
  const { id, name, _id, image, intro } = user;
  const loginUserId = useSelector((state) => state.user.userData._id);
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
        <UserIcon id={id} image={image} size={"large"} />
      </div>

      <div className="profile_info">
        <div className="info_header">
          <h1 className="id">{id}</h1>
          {loginUserId === _id && (
            <Link to="/profile/edit" className="profile_btn">
              프로필 편집
            </Link>
          )}
        </div>
        <ul className="profile_list">
          <li>
            게시물 <span className="count">{postCount}</span>
          </li>
        </ul>

        <div className="profile_contents">
          <p className="name">{name}</p>
          <p className="contents">{intro}</p>
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
    display: flex;
    justify-content: center;
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

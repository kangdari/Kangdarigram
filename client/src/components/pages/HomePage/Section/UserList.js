import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import palette from "../../../../utils/palette";

import UserIcon from "../../../Common/UserIcon";

const UserItem = ({ user }) => {
  return (
    <UserItemBlock>
      <div className="link_inner">
        {user && (
          <>
            <UserIcon id={user.id} image={user.image} />
            <span className="id">{user.id}</span>
          </>
        )}
      </div>
    </UserItemBlock>
  );
};

const UserList = () => {
  const { userList } = useSelector((state) => state.user);

  return (
    <UserListContainer>
      <div className="user_list_block">
        <List>
          <ul className="ul">
            {userList.map((user) => (
              <UserItem user={user} key={user._id} />
            ))}
          </ul>
        </List>
      </div>
    </UserListContainer>
  );
};

const UserListContainer = styled.div`
  border: 1px solid ${palette.gray[3]};
  padding: 16px 0;
  margin-bottom: 24px;
  border-radius: 3px;

  .user_list_block {
    height: 84px;
    overflow-y: hidden;
    padding-top: 10px;
  }
`;

const List = styled.div`
  overflow-x: auto;
  overflow-y: hidden;

  .ul {
    display: flex;
    flex-direction: row;
  }
`;

const UserItemBlock = styled.li`
  width: 80px;
  padding: 0 15px;
  height: 100px;

  .link_inner {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .id {
    font-size: 12px;
  }
`;

export default UserList;

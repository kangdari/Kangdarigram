import React from "react";
import styled from "styled-components";
import palette from "../../../../utils/palette";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const UserItem = () => {
  return (
    <UserItemBlock>
      <button className="btn">
        <div className="btn_inner">
          <StyledIcon icon={faUserCircle} />
          <span className="id">아이디</span>
        </div>
      </button>
    </UserItemBlock>
  );
};

const UserItemBlock = styled.li`
  width: 80px;
  padding: 0 4px;
  height: 122px;

  .btn {
    width: 64px;
    height: 80%;
  }

  .btn_inner {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .id {
    font-size: 12px;
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  color: ${palette.gray[5]};
  font-size: 55px;
  cursor: pointer;
  margin-bottom: 5px;
`;

const UserList = () => {
  return (
    <UserListContainer>
      <div className="user_list_block">
        <div className="box">
          <List>
            <div className="box2">
              <ul className="ul">
                <UserItem />
                <UserItem />
                <UserItem />
                <UserItem />
                <UserItem />
                <UserItem />
                <UserItem />
                <UserItem />
                <UserItem />
                <UserItem />
                <UserItem />
                <UserItem />
              </ul>
            </div>
          </List>
        </div>
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
  }

  .box {
    width: 100%;
    height: 100%;
  }
`;

const List = styled.div`
  overflow-x: auto;
  overflow-y: hidden;

  .box2 {
    display: flex;
    flex-direction: row;
    height: 100%;
  }

  .ul {
    display: flex;
    flex-direction: row;
  }
`;

export default UserList;

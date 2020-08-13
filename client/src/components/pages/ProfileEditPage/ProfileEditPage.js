import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import FileUploader from "./FileUploader";

import Button from "../../Common/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const ProfileEditPage = () => {
  const { id } = useSelector((state) => state.user.userData);

  return (
    <ProfileEditPageBlock>
      <ProfileInfoBlock>
        <StyledIcon icon={faUserCircle} />
        <ProfileInfo>
          <UserId>{id}</UserId>
          <FileUploader />
        </ProfileInfo>
      </ProfileInfoBlock>
      <form>
        <InputBlock>
          <LabelBlock>
            <Label htmlFor="name">이름</Label>
          </LabelBlock>
          <StyledInput id="name" type="text" />
        </InputBlock>

        <InputBlock>
          <LabelBlock>
            <Label htmlFor="userName">사용자 이름</Label>
          </LabelBlock>
          <StyledInput id="userName" type="text" />
        </InputBlock>

        <InputBlock>
          <LabelBlock>
            <Label htmlFor="">소개</Label>
          </LabelBlock>
          <TextArea></TextArea>
        </InputBlock>

        <InputBlock>
          <LabelBlock />
          <Button type="submit" blue>
            제출
          </Button>
        </InputBlock>
      </form>
    </ProfileEditPageBlock>
  );
};

const LabelBlock = styled.div`
  width: 190px;
  padding: 0 32px;
  text-align: right;

  @media screen and (max-width: 736px) {
    width: 90%;
    max-width: 355px;
    text-align: left;
    padding: 0;
    margin-bottom: 5px;
  }
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 600;
`;

const InputBlock = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  padding: 0 30px;

  @media screen and (max-width: 736px) {
    flex-direction: column;
  }
`;

const StyledInput = styled.input`
  width: 355px;
  height: 32px;
  padding: 0 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid lightgrey;

  @media screen and (max-width: 736px) {
    width: 90%;
    max-width: 355px;
  }
`;

const TextArea = styled.textarea`
  font-size: 16px;
  width: 355px;
  padding: 6px 10px;
  height: 60px;
  border: 1px solid lightgrey;
  border-radius: 4px;
  resize: vertical;

  @media screen and (max-width: 736px) {
    width: 90%;
    max-width: 355px;
  }
`;

// 삭제 예정
const StyledIcon = styled(FontAwesomeIcon)`
  color: lightgrey;
  font-size: 35px;
  cursor: pointer;
  margin-right: 32px;
  margin-left: 155px;

  @media screen and (max-width: 736px) {
    margin-left: 0;
  }
`;

const ProfileInfoBlock = styled.div`
  display: flex;
  margin-bottom: 16px;
  @media screen and (max-width: 736px) {
    width: 90%;
    max-width: 355px;
    margin: 0 auto 16px auto;
    padding: 0 30px;
  }
`;

const ProfileInfo = styled.div``;

const ProfileEditPageBlock = styled.div`
  max-width: 700px;
  width: 100%;
  margin: 200px auto 0 auto;
  padding: 20px 20px 0;

  display: flex;
  flex-direction: column;

  @media screen and (max-width: 736px) {
    padding: 20px 0 0;
  }
`;

const UserId = styled.h1`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 2px;
`;

export default ProfileEditPage;

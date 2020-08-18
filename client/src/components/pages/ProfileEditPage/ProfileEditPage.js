import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import FileUploader from "./FileUploader";
import Button from "../../Common/Button";
import UserIcon from "../../Common/UserIcon";
import api from "../../../utils/apiUtils";

const ProfileEditPage = ({ history }) => {
  const { id, image, _id, name, intro } = useSelector(
    (state) => state.user.userData,
  );
  const [values, setValues] = useState({
    id,
    name,
    intro,
  });
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false); // Message 가시성 설정
  const [disabled, setDisabled] = useState(true); // 제출 버튼 활성호 설정

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.id]: e.target.value,
    });
    setDisabled(false);
  };

  // profile 수정
  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .post("/api/users/edit-profile", { ...values, _id })
      .then((res) => {
        history.push(`/${values.id}`);
      })
      .catch((err) => {
        setMessage("이미 존재하는 아이디입니다.");
        showMessage();
        // 이미 존재하는 id
      });
  };

  const updateMessage = (message) => {
    setMessage(message);
    showMessage();
  };

  const showMessage = () => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  };

  return (
    <ProfileEditPageBlock>
      <Helmet>
        <title>프로필 편집</title>
      </Helmet>

      <ProfileInfoBlock>
        <IconBlock>
          <UserIcon id={id} image={image} />
        </IconBlock>
        <ProfileInfo>
          <UserId>{id}</UserId>
          <FileUploader userId={_id} updateMessage={updateMessage} />
        </ProfileInfo>
      </ProfileInfoBlock>
      <form onSubmit={handleSubmit}>
        <InputBlock>
          <LabelBlock>
            {/* 중복 불가 */}
            <Label htmlFor="id">아이디</Label>
          </LabelBlock>
          <StyledInput
            id="id"
            type="text"
            onChange={handleChange}
            value={values.id}
          />
        </InputBlock>

        <InputBlock>
          <LabelBlock>
            <Label htmlFor="name">사용자 이름</Label>
          </LabelBlock>
          <StyledInput
            id="name"
            type="text"
            onChange={handleChange}
            value={values.name}
          />
        </InputBlock>

        <InputBlock>
          <LabelBlock>
            <Label htmlFor="">소개</Label>
          </LabelBlock>
          <TextArea
            id="intro"
            onChange={handleChange}
            value={values.intro}
          ></TextArea>
        </InputBlock>

        <InputBlock>
          <LabelBlock />
          <Button type="submit" blue disabled={disabled}>
            제출
          </Button>
        </InputBlock>
      </form>
      <MessageContainer>
        <MessageBlock visible={visible}>
          <Message>{message}</Message>
        </MessageBlock>
      </MessageContainer>
    </ProfileEditPageBlock>
  );
};

const MessageContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
`;

const MessageBlock = styled.div`
  background: #000;
  transform: ${({ visible }) =>
    visible ? "translateY(0px)" : "translateY(60px)"};
  transition: transform 0.4s ease-out;
`;

const Message = styled.p`
  min-height: 60px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  padding: 12px;
`;

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

const IconBlock = styled.div`
  margin-right: 32px;
  margin-left: 155px;
  border-radius: 50%;
  overflow: hidden;

  @media screen and (max-width: 736px) {
    margin-left: 0;
  }
`;

const ProfileInfoBlock = styled.div`
  display: flex;
  align-items: center;
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
  height: 100%;
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

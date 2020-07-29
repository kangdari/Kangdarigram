import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

import { save, unSave, checkSave } from "../../api/save";

const Save = ({ postId }) => {
  const [saved, setSaved] = useState(false); // 저장 상태
  const { _id } = useSelector((state) => state.user.userData);
  const saveVariable = {
    postId: postId,
    userId: _id,
  };

  useEffect(() => {
    // save 되었는지 확인
    checkSave(saveVariable).then((res) => {
      if (res.data.success) {
        setSaved(res.data.saved);
      } else {
        alert("save 정보 읽어오기 실패");
      }
    });
  }, [saveVariable]);

  const onSave = () => {
    const saveVariable = {
      postId: postId,
      userId: _id,
    };

    if (saved) {
      // 이미 저장된 포스트
      unSave(saveVariable).then((res) => {
        if (res.data.success) {
          setSaved(false);
        } else {
          alert("unsave 실패");
        }
      });
    } else {
      // 아직 저장 안 된 포스트
      save(saveVariable).then((res) => {
        if (res.data.success) {
          setSaved(true);
        } else {
          alert("save 실패");
        }
      });
    }
  };

  return (
    <StyledIcon saved={saved ? 1 : 0} onClick={onSave} icon={faBookmark} />
  );
};

const StyledIcon = styled(FontAwesomeIcon)`
  /* save state에 따라 색상 변화 */
  color: ${(props) => (props.saved ? "black" : "white")};
  margin: 8px 8px 8px auto;
  cursor: pointer;
`;

export default Save;

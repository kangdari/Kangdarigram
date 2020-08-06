import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

import { save, unSave, checkSave } from "../../api/save";
import palette from "../../utils/palette";

const Save = ({ postId, _size }) => {
  const [saved, setSaved] = useState(false); // 저장 상태
  const { _id } = useSelector((state) => state.user.userData);

  useEffect(() => {
    const saveVariable = {
      postId: postId,
      userId: _id,
    };

    let mounted = true;
    // save 되었는지 확인
    checkSave(saveVariable).then((res) => {
      if (res.data.success && mounted) {
        setSaved(res.data.saved);
      }
    });

    // clear-up
    return () => (mounted = false);
  }, [postId, _id]);

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
    <StyledIcon
      saved={saved ? 1 : 0}
      _size={_size}
      onClick={onSave}
      icon={faBookmark}
    />
  );
};

const StyledIcon = styled(FontAwesomeIcon)`
  /* save state에 따라 색상 변화 */
  color: ${(props) => (props.saved ? "black" : palette.gray[5])};
  font-size: ${(props) => (props._size === "large" ? "24px" : "10px")};

  margin: 8px 8px 8px auto;
  cursor: pointer;
`;

export default Save;

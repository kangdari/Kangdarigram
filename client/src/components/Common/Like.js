import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { saveLike, unSaveLike, getLike } from "../../api/like";
import palette from "../../utils/palette";

const Like = ({ postId, commentId }) => {
  const [liked, setLiked] = useState(false);
  const { _id } = useSelector((state) => state.user.userData);
  const variable = {
    userId: _id,
    postId: postId,
    commentId: commentId,
  };

  useEffect(() => {
    getLike(variable).then(({ data }) => {
      console.log(data);
      if (data.success) {
        setLiked(data.liked);
      } else {
        alert("save 정보 읽어오기 실패");
      }
    });
  }, [variable]);

  const onSaveLike = () => {
    if (!liked) {
      saveLike(variable).then(({ data }) => {
        if (data.success) {
          setLiked(true);
        } else {
          alert("like 실패");
        }
      });
    } else {
      unSaveLike(variable).then(({ data }) => {
        if (data.success) {
          setLiked(false);
        } else {
          alert("unlike 실패");
        }
      });
    }
  };

  return (
    <StyledIcon liked={liked ? 1 : 0} onClick={onSaveLike} icon={faHeart} />
  );
};

const StyledIcon = styled(FontAwesomeIcon)`
  color: ${(props) => (props.liked ? "red" : palette.gray[5])};
  font-size: 10px;
  cursor: pointer;
`;

export default Like;

import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";

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

  const getLike = useCallback(() => {
    axios.post("/api/like/getLike", variable).then((res) => {
      if (res.data.success && res.data.liked) {
        setLiked(res.data.liked);
      }
    });
  }, [variable]);

  useEffect(() => {
    getLike();
  }, [getLike]);

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

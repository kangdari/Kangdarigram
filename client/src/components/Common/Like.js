import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import palette from "../../utils/palette";
import { like, unLike } from "../../_actions/like_action";

const Like = ({ postId, commentId }) => {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const { _id } = useSelector((state) => state.user.userData);

  const variable = {
    userId: _id,
    postId: postId,
    commentId: commentId,
  };

  const getLikeState = useCallback(() => {
    axios.post("/api/like/get-like-state", variable).then((res) => {
      if (res.data.success && res.data.liked) {
        setLiked(res.data.liked);
      }
    });
  }, [variable]);

  useEffect(() => {
    getLikeState();
  }, [getLikeState]);

  const onSaveLike = async () => {
    if (!liked) {
      await dispatch(like(variable));
      setLiked(true);
    } else {
      await dispatch(unLike(variable));
      setLiked(false);
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

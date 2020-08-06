import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import palette from "../../utils/palette";
import { like, unLike } from "../../_actions/like_action";

const Like = ({ postId, commentId, _size, getLikeCount }) => {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const { _id } = useSelector((state) => state.user.userData);

  const variable = {
    userId: _id,
    postId: postId,
    commentId: commentId,
  };

  useEffect(() => {
    let mounted = true;
    // 좋아요 상태 가져오기
    axios.post("/api/like/get-like-state", variable).then((res) => {
      if (res.data.success && res.data.liked && mounted) {
        setLiked(res.data.liked);
      }
    });

    // clean-up
    return () => (mounted = false);
  }, [variable]);

  const onSaveLike = async () => {
    if (!liked) {
      await dispatch(like(variable));
      setLiked(true);
    } else {
      await dispatch(unLike(variable));
      setLiked(false);
    }
    // HomePage에서 사용
    if (getLikeCount) getLikeCount();
  };

  return (
    <StyledIcon
      className="like_icon"
      liked={liked ? 1 : 0}
      _size={_size}
      onClick={onSaveLike}
      icon={faHeart}
    />
  );
};

const StyledIcon = styled(FontAwesomeIcon)`
  color: ${(props) => (props.liked ? "red" : palette.gray[5])};
  /* small, large */
  font-size: ${(props) => (props._size === "large" ? "24px" : "12px")};
  cursor: pointer;
`;

export default Like;

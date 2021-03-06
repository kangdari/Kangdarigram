import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import api from "../../utils/apiUtils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import palette from "../../utils/palette";
import { like, unLike } from "../../_actions/like_action";

const Like = ({ postId, commentId, _size, type }) => {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const { _id } = useSelector((state) => state.user.userData);
  const { loading } = useSelector((state) => state.loading);

  useEffect(() => {
    let mounted = true;
    const variable = {
      userId: _id,
      postId: postId,
      commentId: commentId,
    };
    // 좋아요 상태 가져오기
    api.post("/api/like/get-like-state", variable).then((res) => {
      if (res.data.success && res.data.liked && mounted && !loading) {
        setLiked(res.data.liked);
      }
    });

    // clean-up
    return () => (mounted = false);
  }, [_id, postId, commentId, loading]);

  const onSaveLike = async () => {
    const variable = {
      userId: _id,
      postId: postId,
      commentId: commentId,
      type,
    };

    if (!liked) {
      await dispatch(like(variable));
      setLiked(true);
    } else {
      await dispatch(unLike(variable));
      setLiked(false);
    }
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

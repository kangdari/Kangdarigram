import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { withRouter, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCompass,
  faHeart,
  faUserCircle,
  faBookmark,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../Common/Button";
import palette from "../../../utils/palette";
import { logout } from "../../../_actions/user_action";

const RightMenu = ({ history }) => {
  const dispatch = useDispatch();
  const modalEl = useRef(null);
  const { userData } = useSelector((state) => state.user);
  const [show, setShow] = useState(false);

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (e.target.closest("div") !== modalEl.current) {
        setShow(false);
      }
    });
  }, []);

  const onShow = () => {
    show ? setShow(false) : setShow(true);
  };

  const onLogout = async () => {
    await dispatch(logout());
    history.push("/login");
    setShow(false);
  };

  if (!userData.isAuth) {
    return (
      <div>
        <Button to="/login" blue>
          로그인
        </Button>
        <Button to="/register">회원가입</Button>
      </div>
    );
  } else {
    return (
      <RightMenuBlock>
        <Link className="link_icon" to="/" tabIndex="0">
          <FontAwesomeIcon icon={faHome} color="white" />
        </Link>
        <Link className="link_icon" to="/write" tabIndex="0">
          <FontAwesomeIcon icon={faPen} color="white" />
        </Link>
        <Link className="link_icon" to="" tabIndex="0">
          <FontAwesomeIcon icon={faCompass} color="white" />
        </Link>
        <Link className="link_icon" to="" tabIndex="0">
          <FontAwesomeIcon icon={faHeart} color="white" />
        </Link>
        <div className="profile" tabIndex="0" ref={modalEl} onClick={onShow}>
          <FontAwesomeIcon icon={faUserCircle} color="white" />
          {show ? (
            <div className="profile_modal">
              <Link to={`/${userData.id}`} onClick={onShow}>
                <div className="item">
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    color="white"
                    size="sm"
                  />
                  프로필
                </div>
              </Link>
              <Link to={`/${userData.id}/saved`} onClick={onShow}>
                <div className="item">
                  <FontAwesomeIcon icon={faBookmark} color="white" />
                  저장됨
                </div>
              </Link>
              <div onClick={onLogout}>
                <div className="item">로그아웃</div>
              </div>
            </div>
          ) : null}
        </div>
      </RightMenuBlock>
    );
  }
};

const RightMenuBlock = styled.div`
  display: flex;

  svg {
    font-size: 24px;
    margin: 0 10px;
    stroke: black;
    stroke-width: 25;
  }

  .link_icon {
    outline: none;
  }

  .profile {
    cursor: pointer;
    position: relative;
    outline: none;

    .profile_modal {
      position: absolute;
      top: 36px;
      right: 0;
      width: 150px;
      background: #fff;
      border-radius: 4px;
      border: 1px solid ${palette.gray[4]};

      &:after {
        content: "";
        position: absolute;
        top: -9px;
        right: 12px;
        width: 15px;
        height: 15px;
        background: #fff;
        border: 1px solid ${palette.gray[4]};
        border-right: none;
        border-bottom: none;
        transform: rotate(45deg);
      }

      svg {
        font-size: 16px;
        margin: 0;
        margin-right: 10px;
      }

      .item {
        width: 100%;
        padding: 8px 15px;
        font-size: 14px;
      }

      .item:hover {
        background: ${palette.gray[0]};
      }
    }
  }
`;

export default withRouter(RightMenu);

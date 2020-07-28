import React, { useEffect } from "react";
import styled from "styled-components";
import Portal from "./Portal";

const Modal = ({ visible, closable, maskClosable, onCloseModal, children }) => {
  useEffect(() => {
    if (visible) {
      document.body.style.cssText = `overflow: hidden`;
    }
  }, [visible]);

  const onMaskClick = (e) => {
    // e.target 이벤트 발생 위치
    // e.currentTarget 이벤트 생성 위치
    if (e.target === e.currentTarget) {
      onCloseModal();
      document.body.style.cssText = `overflow: auto`;
    }
  };

  // 버튼 클릭 => 모달 끄기
  const onClose = (e) => {
    if (onCloseModal) onCloseModal();
    document.body.style.cssText = `overflow-y: auto`;
  };

  return (
    <Portal elementId="modal-root">
      <ModalOverlay visible={visible}></ModalOverlay>
      <ModalBlock
        className="modal_block"
        visible={visible}
        onClick={maskClosable && onMaskClick}
        tabIndex="-1"
      >
        {children}
        {/* <ModalInner className="modal_inner"></ModalInner> */}
      </ModalBlock>
      {closable ? <CloseBtn className="close_btn" onClick={onClose} /> : null}
    </Portal>
  );
};

// 배경
const ModalOverlay = styled.div`
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.5);
`;
// 모달
const ModalBlock = styled.div`
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 40px;

  @media screen and (max-width: 480px) {
    padding: 0;
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  cursor: pointer;
  top: 40px;
  right: 60px;
  border: none;
  outline: none;
  background: transparent;
  color: #fff;
  z-index: 1000;
  transform: rotate(45deg);

  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 40px;
    height: 4px;
    background: #fff;
    border-radius: 6px;
  }
  &:after {
    transform: rotate(90deg);
  }
`;

export default Modal;

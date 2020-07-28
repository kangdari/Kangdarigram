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
        <ModalInner className="modal_inner">
          {closable ? (
            <CloseBtn className="close_btn" onClick={onClose} />
          ) : null}
        </ModalInner>
      </ModalBlock>
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
`;

const ModalInner = styled.div`
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 10px;
  width: 360px;
  max-width: 480px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 40px 20px;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 0;
  right: 10px;
  border: none;
  outline: none;
  background: transparent;
  font-size: 20px;

  &:after {
    content: "x";
  }
`;

export default Modal;

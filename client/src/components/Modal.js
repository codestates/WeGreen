import styled from 'styled-components';
import { color, device, radius } from '../styles';

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9999;
  background-color: ${color.backdrop};
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99999;
  display: flex;
  flex-direction: column;
  width: 288px;
  padding: 1rem;
  background-color: white;
  border-radius: ${radius};
  text-align: center;

  @media ${device.laptop} {
    width: 400px;
  }
`;

const CloseBtn = styled.button`
  position: relative;
  align-self: flex-end;
  width: 20px;
  height: 20px;
  background-color: transparent;
  text-indent: -999px;
  overflow: hidden;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 9px;
    left: 0;
    width: 20px;
    height: 2px;
    border-radius: 1px;
    background-color: ${color.primaryBorder};
    transform: rotate(45deg);
  }

  &::after {
    content: '';
    position: absolute;
    top: 9px;
    left: 0;
    width: 20px;
    height: 2px;
    border-radius: 1px;
    background-color: ${color.primaryBorder};
    transform: rotate(-45deg);
  }
`;

const Modal = ({ children, closeModal }) => {
  return (
    <>
      <Backdrop></Backdrop>
      <ModalContainer>
        <CloseBtn onClick={() => closeModal(false)}>close</CloseBtn>
        {children}
      </ModalContainer>
    </>
  );
};

export default Modal;

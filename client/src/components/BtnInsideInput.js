import styled from 'styled-components';
import { color, radius, device } from '../styles';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  border: 1px solid ${color.primaryBorder};
  border-radius: ${radius};
  overflow: hidden;
  &:focus-within {
    border: 2px solid ${color.blue};
  }
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  padding: 1rem;
  border: none;
  border-radius: ${radius};
  font-size: 1rem;
  &:focus {
    border: none;
  }
`;

const Button = styled.button`
  position: relative;
  height: 34px;
  margin: 2px;
  padding: 0 1rem;
  border-radius: 17px;
  background-color: ${color.secondary};
  color: ${color.black};
  font-size: 1rem;
  white-space: nowrap;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: black;
    border-radius: 17px;
    opacity: 0;
    transition: all 0.2s ease;
  }

  &:hover {
    &::after {
      opacity: 0.1;
    }
  }
`;

const DisabledButton = styled(Button)`
  background-color: ${color.greyLight};
  color: ${color.white};
  cursor: not-allowed;

  &:hover {
    &::after {
      opacity: 0;
    }
  }
`;

const BtnInsideInput = ({
  value = '',
  type = 'text',
  placeholder = '내용을 입력하세요',
  isInputActive = true,
  handleValue,
  btnContent = 'BUTTON',
  isBtnActive = false,
  handler = () => {},
}) => {
  const handleOnChange = (event) => {
    handleValue(event.target.value);
  };
  return (
    <Container>
      <Input
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={!isInputActive}
        onChange={handleOnChange}
      />
      {isBtnActive ? (
        <Button onClick={handler}>{btnContent}</Button>
      ) : (
        <DisabledButton onClick={handler} disabled>
          {btnContent}
        </DisabledButton>
      )}
    </Container>
  );
};

export default BtnInsideInput;

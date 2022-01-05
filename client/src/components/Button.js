import styled from 'styled-components';
import { color, radius } from '../styles';

const ButtonTemplate = styled.button`
  position: relative;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: 0 1rem;
  border-radius: ${radius};
  background-color: ${(props) => color[props.color]};
  font-size: 1rem;
  cursor: pointer;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: black;
    opacity: 0;
    transition: all 0.2s ease;
  }

  &:hover {
    &::after {
      opacity: 0.1;
    }
  }
`;

const Button = ({
  width = '100%',
  height = '40px',
  color = 'secondary',
  content = 'BUTTON',
  handler = () => {},
}) => {
  return (
    <ButtonTemplate
      width={width}
      height={height}
      color={color}
      onClick={handler}
    >
      {content}
    </ButtonTemplate>
  );
};

export default Button;

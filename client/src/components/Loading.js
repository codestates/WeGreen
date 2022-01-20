import styled, { keyframes } from 'styled-components';
import { color } from '../styles/index';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin: 2rem 0;

  p {
    color: ${(props) => (props.theme === 'dark' ? color.white : color.primary)};
    font-size: 1.25rem;
  }
`;

const spin = keyframes`
  100% { 
    transform: rotate(360deg); 
  } 
} 
`;

const Spinner = styled.div`
  display: inline-block;
  box-sizing: border-box;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  border: 4px solid
    ${(props) =>
      props.theme === 'dark'
        ? 'rgba(255, 255, 255, 0.2)'
        : color.primaryBorder};
  border-top-color: ${(props) =>
    props.theme === 'dark' ? color.white : color.primary};
  animation: ${spin} 1s infinite linear;
`;

const Loading = ({ theme, text }) => {
  return (
    <Container theme={theme}>
      <Spinner theme={theme}></Spinner>
      <p>{text}</p>
    </Container>
  );
};

export default Loading;

import styled from 'styled-components';
import { color } from '../styles/index';
import { ReactComponent as NoResultIcon } from '../assets/images/icon_noresult.svg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
  opacity: 0.5;

  p {
    font-size: 1.25rem;
    color: ${(props) => (props.theme === 'dark' ? color.white : color.primary)};
  }
`;

const NoResult = ({ theme, text }) => {
  return (
    <Container theme={theme}>
      <NoResultIcon
        width='48px'
        height='48px'
        fill={theme === 'dark' ? color.white : color.primary}
      />
      <p>{text}</p>
    </Container>
  );
};

export default NoResult;

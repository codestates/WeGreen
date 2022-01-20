import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { color, device } from '../styles';
import { ReactComponent as TextImage } from '../assets/images/404.svg';
import Button from '../components/Button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
  height: calc(100vh - 60px);
  min-height: fit-content;
  padding: 1rem;
  background-color: ${color.primaryLight};
  text-align: center;
`;

const MobileBreak = styled.br`
  display: inline;

  @media ${device.tablet} {
    display: none;
  }
`;

const ImageContainer = styled.div`
  width: 60%;
  max-width: 360px;
`;

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <ImageContainer>
        <TextImage width='100%' height='100%' />
      </ImageContainer>
      <h1>페이지를 찾을 수 없습니다.</h1>
      <p>
        요청하신 페이지는 존재하지 않거나, <MobileBreak /> 더이상 사용할 수 없는
        페이지입니다. <br />
        입력하진 주소가 정확한지 <MobileBreak /> 다시 한 번 확인해주세요.
      </p>
      <Button
        content='홈으로 이동'
        width='fit-content'
        handler={() => navigate('/')}
      />
    </Container>
  );
};

export default NotFound;

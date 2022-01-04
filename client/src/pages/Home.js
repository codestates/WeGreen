import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button';
import ChallengeCard from '../components/ChallengeCard';
import { color, device, contentWidth } from '../styles';
import { dummyChallenges } from '../data/dummyData';

const HomeContainer = styled.div`
  background-color: ${color.primaryLight};
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  height: 100vh;
  text-align: center;

  p {
    display: none;
  }

  @media ${device.tablet} {
    p {
      display: block;
    }
  }
`;

const ChallengeListContainer = styled.div`
  padding: 1rem;
  max-width: ${contentWidth};
  margin: 0 auto;

  @media ${device.laptop} {
    padding: 1rem 0;
  }
`;

const ChallengeList = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media ${device.mobileLandscape} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${device.laptop} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Home = () => {
  const navigate = useNavigate();
  return (
    <HomeContainer>
      <HeroSection>
        <h1>일주일 챌린지로 환경을 지켜요, WeGreen</h1>
        <p>
          다른 사람들과 함께 챌린지를 진행하며 서로를 응원해요.
          <br />
          챌린지를 성공하면 뱃지가 주어져요. 뱃지들을 모아 마이페이지를
          꾸며보세요.
          <br />
          이달 가장 많이 참여한 챌린지와 자신이 했던 챌린지 목록을 받아볼 수
          있습니다.
        </p>
        <Button
          width="fit-content"
          content={'챌린지 보러가기'}
          handler={() => navigate('/challenges')}
        />
      </HeroSection>
      <ChallengeListContainer>
        <h2>인기 챌린지를 확인해 보세요</h2>
        <ChallengeList>
          {dummyChallenges.map((el) => (
            <ChallengeCard challenge={el} key={el.challenge_id} />
          ))}
        </ChallengeList>
      </ChallengeListContainer>
    </HomeContainer>
  );
};

export default Home;

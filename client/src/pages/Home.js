import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeTitle } from '../actions';
import styled from 'styled-components';
import aos from 'aos';
import 'aos/dist/aos.css';
import Button from '../components/Button';
import ChallengeCard from '../components/ChallengeCard';
import Loading from '../components/Loading';
import NoResult from '../components/NoResult';
import Footer from '../components/Footer';
import { color, device, contentWidth, boxShadow } from '../styles';
import mainIllust from '../assets/images/main_illust.png';
import { ReactComponent as Wave } from '../assets/images/wave.svg';
import { requestPopularChallenges } from '../apis';
import image1 from '../assets/images/home/desc1.gif';
import image3badges from '../assets/images/home/desc3_badges.gif';
import image3animals from '../assets/images/home/desc3_animals.gif';

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

  img {
    width: 80%;
    max-width: 500px;
    margin-top: -1rem;
    padding-bottom: 1rem;
  }

  span {
    color: ${color.primary};
  }

  p {
    display: none;
  }

  @media ${device.tablet} {
    p {
      display: block;
    }
  }
`;

const ChallengesContainer = styled.div`
  background-color: ${color.primary};
`;

const ChallengeListContainer = styled.div`
  padding: 1rem;
  max-width: ${contentWidth};
  margin: 0 auto;

  h2 {
    color: ${color.white};
    text-align: center;
    padding-bottom: 1rem;
  }

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

const ServiceSection = styled.section`
  background-color: ${(props) =>
    props.theme === 'dark' ? color.primary : 'none'};
  color: ${(props) => (props.theme === 'dark' ? color.white : color.black)};
`;

const ServiceSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 6rem 1rem;
  text-align: center;
  word-break: keep-all;

  img {
    order: 3;
    width: 100%;
    max-width: 320px;
    margin-top: 1rem;
    border: 4px solid ${color.primary};
    border-radius: 10px;
    box-shadow: ${boxShadow};
  }

  @media ${device.laptop} {
    flex-direction: row;
    width: ${contentWidth};
    margin: 0 auto;
    padding: 8rem 0;
    text-align: ${(props) => (props.theme === 'dark' ? 'right' : 'left')};
    img {
      order: ${(props) => (props.theme === 'dark' ? 1 : 3)};
    }
  }
`;

const DescContainer = styled.div`
  order: 2;
  h2 {
    margin-bottom: 2rem;
    line-height: 1.5;
  }
  p {
    line-height: 2;
  }
`;

const InitiationSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 6rem 1rem;
  text-align: center;
  word-break: keep-all;
  h2 {
    margin-bottom: 2rem;
    line-height: 1.5;
  }
  p {
    line-height: 2;
  }
`;

const GIFContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  height: 80vw;
  max-height: 320px;
  order: 3;
  @media ${device.laptop} {
    width: 50%;
    order: ${(props) => (props.theme === 'dark' ? 1 : 3)};
  }
  text-align: right;
  .bottomleft {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 90%;
    margin-top: 0;
  }

  .topright {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    width: 50%;
    margin-top: 0;
  }
`;

const Home = () => {
  const dispatch = useDispatch();
  dispatch(changeTitle('WeGreen | 홈'));

  const navigate = useNavigate();

  const [challenges, setChallenges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNoResult, setHasNoResult] = useState(false);

  useEffect(() => {
    aos.init({ duration: 1000, offset: 50, once: true });
    requestPopularChallenges(4).then((result) => {
      setChallenges(result);
      setIsLoading(false);
      if (result.length === 0) setHasNoResult(true);
    });
  }, []);

  return (
    <HomeContainer>
      <HeroSection>
        <img
          src={mainIllust}
          alt='main-illust'
          data-aos='fade-up'
          data-aos-delay='100'
        ></img>
        <h1 data-aos='fade-up' data-aos-delay='200'>
          일주일 챌린지로 환경을 지켜요, <span>WeGreen</span>
        </h1>
        <p data-aos='fade-up' data-aos-delay='300'>
          다른 사람들과 함께 챌린지를 진행하며 서로를 응원해요.
          <br />
          챌린지를 성공하면 뱃지가 주어져요. 뱃지들을 모아 마이페이지를
          꾸며보세요.
          <br />
          이달 가장 많이 참여한 챌린지와 자신이 했던 챌린지 목록을 받아볼 수
          있습니다.
        </p>
        <div data-aos='fade-up' data-aos-delay='400'>
          <Button
            width='fit-content'
            content={'챌린지 보러가기'}
            handler={() => navigate('/challenges')}
          />
        </div>
      </HeroSection>
      <Wave width='100%' height='100' fill={color.primary} />
      <ChallengesContainer>
        <ChallengeListContainer>
          <h2 data-aos='fade-up'>인기 챌린지를 확인해 보세요</h2>
          {isLoading ? (
            <Loading theme='dark' text='인기 챌린지를 불러오는 중입니다.' />
          ) : null}
          {hasNoResult ? (
            <div data-aos='fade-up'>
              <NoResult
                data-aos='fade-up'
                theme='dark'
                text='인기 챌린지가 없습니다.'
              />
            </div>
          ) : null}
          <ChallengeList>
            {challenges.length !== 0
              ? challenges.map((el) => (
                  <ChallengeCard challenge={el} key={el.challenge_id} />
                ))
              : null}
          </ChallengeList>
        </ChallengeListContainer>
      </ChallengesContainer>
      <ServiceSection theme='light'>
        <ServiceSectionContainer theme='light'>
          <DescContainer>
            <h2 data-aos='fade-up'>
              챌린지에
              <br />
              도전해 보세요
            </h2>
            <p data-aos='fade-up'>
              WeGreen 일주일 챌린지로 환경을 지키는 습관을 만들어 보세요. <br />
              모든 챌린지는 실천하기 쉽도록 일주일 단위로 진행됩니다. <br />
              챌린지 참여하기를 눌러 마음에 드는 챌린지에 참여할 수 있습니다.{' '}
              <br />
              마음에 드는 챌린지가 없다면 직접 새로운 챌린지를 만들어 보세요!
            </p>
          </DescContainer>
          <img src={image1} data-aos='fade-up'></img>
        </ServiceSectionContainer>
      </ServiceSection>
      <ServiceSection theme='dark'>
        <ServiceSectionContainer theme='dark'>
          <DescContainer>
            <h2 data-aos='fade-up'>
              다른 사람들은
              <br />
              어떻게 하고 있을까요?
            </h2>
            <p data-aos='fade-up'>
              매일 전체 참여자 중 몇명이 체크인 했는지 확인할 수 있습니다.{' '}
              <br />
              챌린지에 참여한 다른 사람들과 댓글창에서 대화를 나눌 수도 있어요.{' '}
              <br />
              댓글창의 사용자 이름을 클릭하면, <br />
              해당 사용자가의 챌린지 참여 정보를 볼 수 있습니다.
            </p>
          </DescContainer>
          <img src={image1} data-aos='fade-up'></img>
        </ServiceSectionContainer>
      </ServiceSection>
      <ServiceSection theme='light'>
        <ServiceSectionContainer theme='light'>
          <DescContainer>
            <h2 data-aos='fade-up'>
              챌린지 보상으로
              <br />
              마이페이지를 꾸며요
            </h2>
            <p data-aos='fade-up'>
              챌린지를 성공적으로 완료하면 보상으로 랜덤 뱃지가 주어져요!
              <br />
              획득한 뱃지로 마이페이지의 일러스트를 꾸밀 수 있어요.
            </p>
          </DescContainer>
          <GIFContainer>
            <img
              className='topright'
              src={image3badges}
              data-aos='fade-up'
            ></img>
            <img
              className='bottomleft'
              src={image3animals}
              data-aos='fade-up'
            ></img>
          </GIFContainer>
        </ServiceSectionContainer>
      </ServiceSection>
      <ServiceSection theme='dark'>
        <ServiceSectionContainer theme='dark'>
          <DescContainer>
            <h2 data-aos='fade-up'>
              매달 참여결과를
              <br />
              이메일로 받아보세요
            </h2>
            <p data-aos='fade-up'>
              이달 가장 많이 참여한 챌린지와 자신이 했던 챌린지 목록을
              <br />
              등록된 이메일로 받아볼 수 있습니다.
            </p>
          </DescContainer>
          <img src={image1} data-aos='fade-up'></img>
        </ServiceSectionContainer>
      </ServiceSection>
      <InitiationSection>
        <h2 data-aos='fade-up'>챌린지를 시작할 준비가 되셨나요?</h2>
        <p data-aos='fade-up'>
          어떤 챌린지들이 있는지 둘러봅시다.
          <br />
          작은 실천들이 모여 환경을 지키는 큰 힘이 됩니다.
        </p>
        <div data-aos='fade-up'>
          <Button
            width='fit-content'
            content={'챌린지 보러가기'}
            handler={() => navigate('/challenges')}
          />
        </div>
      </InitiationSection>
      <Footer />
    </HomeContainer>
  );
};

export default Home;

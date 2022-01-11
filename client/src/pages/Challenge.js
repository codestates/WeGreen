import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { color, contentWidth, device } from '../styles';
import Tab from '../components/Tab';
import Button from '../components/Button';
import ChallengeInfo from '../components/ChallengeInfo';
import ChallengeCheckin from '../components/ChallengeCheckin';
import ChallengeComments from '../components/ChallengeComments';
import { ReactComponent as EditIcon } from '../assets/images/icon_edit.svg';
import { ReactComponent as PersonIcon } from '../assets/images/icon_person.svg';
import { dummyChallenge } from '../data/dummyData';

const OuterContainer = styled.div`
  @media ${device.laptop} {
    width: 100%;
    height: calc(100vh - 60px);
    background-color: ${color.primaryLight};
  }
`;

const ChallengeContainer = styled.div`
  background-color: ${color.primaryLight};
`;

const CommonContainer = styled.div`
  position: relative;
  padding: 2rem 1rem;

  @media ${device.laptop} {
    width: ${contentWidth};
    margin: 0 auto;
    padding: 2rem 0;
    text-align: center;
  }
`;

const EditBtn = styled.button`
  float: right;
  cursor: pointer;

  @media ${device.laptop} {
    float: none;
    position: absolute;
    top: 2rem;
    right: 0;
  }
`;

const Title = styled.h1`
  @media ${device.laptop} {
    padding: 0 2rem;
    word-wrap: break-word;
  }
`;

const Caption = styled.p`
  color: ${color.secondaryDark};
`;

const ContentContainer = styled.div`
  width: 100%;
  padding: 1rem;
  background-color: ${color.white};
  border-top-right-radius: 60px;

  h3 {
    margin-left: 1rem;
    margin-bottom: 1rem;
    color: ${color.primary};
  }

  @media ${device.laptop} {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 20px;
    width: ${contentWidth};
    margin: 0 auto;
    padding: 0 0 3rem 0;
    background-color: ${color.primaryLight};
    border-radius: 0;
  }
`;

const GridSpan = styled.div`
  grid-row: 1 / 3;
  grid-column: 2;
`;

const Challenge = () => {
  const [view, setView] = useState('info');
  const [challengeInfo, setChallengeInfo] = useState(dummyChallenge);

  const getWindowWidth = () => {
    const { innerWidth: width } = window;
    return width;
  };

  const [windowWidth, setWindowWidth] = useState(getWindowWidth());

  const throttle = (func, waits) => {
    let lastFunc; // timer id of last invocation
    let lastRan; // time stamp of last invocation
    return function (...args) {
      const context = this;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(() => {
          if (Date.now() - lastRan >= waits) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, waits - (Date.now() - lastRan));
      }
    };
  };

  useEffect(() => {
    function handleResize() {
      setWindowWidth(getWindowWidth());
    }
    window.addEventListener('resize', throttle(handleResize, 500));
    return () =>
      window.removeEventListener('resize', throttle(handleResize, 500));
  }, []);

  const tabContent = {
    info: <ChallengeInfo></ChallengeInfo>,
    checkin: <ChallengeCheckin></ChallengeCheckin>,
    comments: <ChallengeComments></ChallengeComments>,
  };
  return (
    <OuterContainer>
      <ChallengeContainer>
        <CommonContainer>
          <EditBtn>
            <EditIcon width='20' height='20' fill={color.secondaryDark} />
          </EditBtn>
          <Title>{challengeInfo.name}</Title>
          <Caption>
            <PersonIcon width='20' height='20' fill={color.secondaryDark} />
            {challengeInfo.join_count}명 참여중
          </Caption>
          <Button href='/editchallenge' content='챌린지 참여하기' />
          {windowWidth < 1024 ? (
            <Tab
              tabInfo={[
                ['info', '정보'],
                ['checkin', '체크인'],
                ['comments', '댓글'],
              ]}
              handleView={setView}
            />
          ) : null}
        </CommonContainer>
        <ContentContainer>
          {windowWidth < 1024 ? (
            tabContent[view]
          ) : (
            <>
              <div>
                <h3>정보</h3>
                <ChallengeInfo />
              </div>
              <GridSpan>
                <h3>댓글</h3>
                <ChallengeComments />
              </GridSpan>
              <div>
                <h3>체크인</h3>
                <ChallengeCheckin />
              </div>
            </>
          )}
        </ContentContainer>
      </ChallengeContainer>
    </OuterContainer>
  );
};

export default Challenge;

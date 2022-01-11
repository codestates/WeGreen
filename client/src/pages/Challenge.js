import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { color } from '../styles';
import Tab from '../components/Tab';
import Button from '../components/Button';
import ChallengeInfo from '../components/ChallengeInfo';
import ChallengeCheckin from '../components/ChallengeCheckin';
import ChallengeComments from '../components/ChallengeComments';

const ChallengeContainer = styled.div`
  background-color: ${color.white};
`;

const Challenge = () => {
  const [view, setView] = useState('info');

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
    <ChallengeContainer>
      Dummy Challenge {useParams().id}
      <Button href='/editchallenge' />
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
      {windowWidth < 1024 ? (
        tabContent[view]
      ) : (
        <>
          <ChallengeInfo />
          <ChallengeCheckin />
          <ChallengeComments />
        </>
      )}
    </ChallengeContainer>
  );
};

export default Challenge;

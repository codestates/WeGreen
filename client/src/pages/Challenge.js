import { useState } from 'react';
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

  const tabContent = {
    info: <ChallengeInfo></ChallengeInfo>,
    checkin: <ChallengeCheckin></ChallengeCheckin>,
    comments: <ChallengeComments></ChallengeComments>,
  };
  return (
    <ChallengeContainer>
      Dummy Challenge {useParams().id}
      <Button href='/editchallenge' />
      <Tab
        tabInfo={[
          ['info', '정보'],
          ['checkin', '체크인'],
          ['comments', '댓글'],
        ]}
        handleView={setView}
      />
      {tabContent[view]}
    </ChallengeContainer>
  );
};

export default Challenge;

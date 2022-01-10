import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { color } from '../styles';

import Button from '../components/Button';

const ConfirmChallengeContainer = styled.div`
  background-color: ${color.white};
`;

const ConfirmChallenge = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state) {
      navigate('/')
    }
  });
  const [challengeInfo, setChallengeInfo] = useState(state)
  console.log(challengeInfo)

  return (
    <ConfirmChallengeContainer>
      Create Dummy Challenge
      <Button />
      <Button />
    </ConfirmChallengeContainer>
  );
};

export default ConfirmChallenge;

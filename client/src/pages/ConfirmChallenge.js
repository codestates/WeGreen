import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { color, contentWidth, radius } from '../styles';

import Button from '../components/Button';

const Container = styled.div`
  padding: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ConfirmChallengeContainer = styled.div`
  width: 100%;
  min-width: 300px;
  max-width: calc(${contentWidth} / 2);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  gap: 1.5rem;
  background-color: ${color.white};
`;

const ChallengeInfoContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
  border: 1px solid ${color.primaryBorder};
  border-radius: ${radius};
`;

const ChallengeInfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  & > h4 {
    color: ${color.primary};
  }
`;

const MessageContainer = styled.div`
  word-break: keep-all;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  gap: 1rem;
`;

const ConfirmChallenge = () => {
  const state = useSelector((state) => state.userReducer);
  const { received } = useLocation();
  const navigate = useNavigate();
  console.log(received)

  useEffect(() => {
    if (!state.isLogin) {
      navigate('/login');
    }
    if (!info) {
      navigate('/createchallenge');
    }
  // eslint-disable-next-line
  }, []);
  
  const info = received ? received : {
    name: "",
    content: "",
    started_at: new Date(),
    requirement: 7,
  }
  
  // eslint-disable-next-line
  const [challengeInfo, setChallengeInfo] = useState(info);

  const startedAt = new Date(challengeInfo.started_at);
  const finishedAt = new Date(challengeInfo.started_at);
  finishedAt.setDate(startedAt.getDate() + 6);

  return (
    <Container>
      <ConfirmChallengeContainer>
        <ChallengeInfoContainer>
          <ChallengeInfoList>
            <h4>챌린지 제목</h4>
            {challengeInfo.name}
          </ChallengeInfoList>
          <ChallengeInfoList>
            <h4>챌린지 설명</h4>
            {challengeInfo.content}
          </ChallengeInfoList>
          <ChallengeInfoList>
            <h4>챌린지 기간</h4>
            {startedAt.toLocaleDateString('ko-KR', { timezone: 'UTC' })} -{' '}
            {finishedAt.toLocaleDateString('ko-KR', { timezone: 'UTC' })}
          </ChallengeInfoList>
          <ChallengeInfoList>
            <h4>챌린지 성공 조건</h4>주 {challengeInfo.requirement}회 체크인
          </ChallengeInfoList>
        </ChallengeInfoContainer>
        <MessageContainer>
          다른 참가자가 챌린지에 참여한 후에는 <br />
          내용을 수정할 수 없습니다. <br />
          이대로 챌린지를 생성할까요?
        </MessageContainer>
        <ButtonContainer>
          <Button content='아니오' color='tertiary' />
          <Button content='네' />
        </ButtonContainer>
      </ConfirmChallengeContainer>
    </Container>
  );
};

export default ConfirmChallenge;

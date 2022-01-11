import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { color, device, radius } from '../styles';

const ChallengeInfoContainer = styled.div`
  background-color: ${color.white};

  @media ${device.laptop} {
    width: 100%;
    padding: 1rem 2rem;
    border-radius: ${radius};
  }
`;

const Highlighted = styled.p`
  color: ${color.primary};
  font-weight: bold;
`;

const BoxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.1rem;
`;

const Box = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  font-size: 0.875rem;
  text-align: center;
  opacity: ${(props) => (props.status === 'before' ? 0.5 : 1)};
`;

const ChallengeInfo = ({ challengeInfo }) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const startedAt = new Date(challengeInfo.started_at);
  const finishedAt = new Date(challengeInfo.started_at);
  finishedAt.setDate(startedAt.getDate() + 6);

  const count = finishedAt.getDate() - startedAt.getDate() + 1;
  const Boxes = new Array(count).fill([]).map((_, i) => {
    const date = new Date(startedAt);
    date.setDate(startedAt.getDate() + i);
    return (
      <Box key={i} status={date < today ? 'before' : 'active'}>
        {date.toString().split(' ')[0]}
        <br />
        {date.getDate()}
      </Box>
    );
  });

  const [status, setStatus] = useState('loading');

  const statusMessage = {
    before: '챌린지 진행 예정',
    now: '챌린지 진행중',
    done: '챌린지 종료',
    loading: '챌린지 불러오는 중',
  };

  useEffect(() => {
    if (today < startedAt) {
      setStatus('before');
    } else if (today < finishedAt) {
      setStatus('now');
    } else {
      setStatus('done');
    }
    // eslint-disable-next-line
  }, []);

  return (
    <ChallengeInfoContainer>
      <Highlighted>{statusMessage[status]}</Highlighted>
      <p>
        {startedAt.toLocaleDateString('ko-KR', { timezone: 'UTC' })} ~{' '}
        {finishedAt.toLocaleDateString('ko-KR', { timezone: 'UTC' })}
      </p>
      <BoxContainer>{Boxes.map((box) => box)}</BoxContainer>
      <Highlighted>챌린지 성공 조건</Highlighted>
      <p>주 {challengeInfo.requirement}회 체크인</p>
      <Highlighted>챌린지 설명</Highlighted>
      <p>{challengeInfo.content}</p>
    </ChallengeInfoContainer>
  );
};

export default ChallengeInfo;

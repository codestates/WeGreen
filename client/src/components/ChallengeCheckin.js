import styled from 'styled-components';
import { color, contentWidth, device, radius } from '../styles';
import { TODAY } from '../data/initialData';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ChallengeCheckinContainer = styled.div`
  width: 100%;
  max-width: calc(${contentWidth} / 2);
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 1rem;
  background-color: ${color.white};

  & p {
    margin: 0;
  }

  & p[class] {
    margin-top: 1rem;
  }

  & p:first-child {
    margin-top: 0;
  }

  @media ${device.laptop} {
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
  background-color: ${(props) =>
    props.checked === 'checked' ? color.secondary : 'white'};
  opacity: ${(props) => (props.status === 'before' ? 0.5 : 1)};
`;

const ProgressContainer = styled.div`
  height: 20px;
  display: flex;
  align-items: center;
  gap: 2rem;
`;
const ProgressBarContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: ${color.secondaryLight};
  border-radius: ${radius};
`;

const ProgressBar = styled.div`
  width: ${(props) => props.width};
  background-color: ${color.secondary};
  border-radius: ${radius};
`;

const ChallengeCheckin = ({ challengeInfo, checkinInfo }) => {
  const checkin_log = checkinInfo.checkin_log.map((el) => {
    const log = new Date(el);
    return log.toString();
  });

  const startedAt = new Date(challengeInfo.started_at);
  const finishedAt = new Date(challengeInfo.started_at);
  finishedAt.setDate(startedAt.getDate() + 6);

  const count = 7;
  const Boxes = new Array(count).fill([]).map((_, i) => {
    const date = new Date(startedAt);
    date.setDate(startedAt.getDate() + i);
    return (
      <Box
        key={i}
        status={date < TODAY ? 'before' : 'active'}
        checked={checkin_log.includes(date.toString()) ? 'checked' : 'none'}
      >
        {date.toString().split(' ')[0]}
        <br />
        {date.getDate()}
      </Box>
    );
  });

  const progress =
    checkinInfo.checkin_log.length / Number(challengeInfo.requirement) >= 1
      ? 1
      : (
          checkinInfo.checkin_log.length / Number(challengeInfo.requirement)
        ).toFixed(2);

  return (
    <Container>
      <ChallengeCheckinContainer>
        {TODAY < startedAt ? (
          <p>챌린지 진행 예정입니다</p>
        ) : TODAY <= finishedAt ? (
          <p>
            오늘은 {challengeInfo.join_count}명 중 {checkinInfo.checkin_count}
            명이 <br />
            체크인 하였습니다.
          </p>
        ) : challengeInfo.is_joined ? (
          <p>{checkinInfo.checkin_count}번 체크인 하셨습니다.</p>
        ) : (
          <p>완료된 챌린지입니다.</p>
        )}
        {challengeInfo.is_joined ? (
          <>
            <Highlighted>나의 체크인 현황</Highlighted>
            <BoxContainer>{Boxes.map((box) => box)}</BoxContainer>
            <Highlighted>나의 목표 달성률</Highlighted>
            <ProgressContainer>
              <p>{progress * 100}%</p>
              <ProgressBarContainer>
                <ProgressBar width={`${progress * 100}%`} />
              </ProgressBarContainer>
            </ProgressContainer>
          </>
        ) : null}
      </ChallengeCheckinContainer>
    </Container>
  );
};

export default ChallengeCheckin;

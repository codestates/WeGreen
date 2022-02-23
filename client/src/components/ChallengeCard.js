// import { useEffect } from 'react';
import styled from 'styled-components';
// import aos from 'aos';
import { boxShadow, color, radius } from '../styles';
import { Link } from 'react-router-dom';
import { TODAY } from '../data/initialData';

const ChallengeCardList = styled.li`
  padding: 1rem;
  background-color: ${color.white};
  border-radius: ${radius};
  box-shadow: ${boxShadow};

  & h3 {
    width: 200px;
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const Highlighted = styled.p`
  color: ${color.primary};
  font-weight: bold;
`;

const ChallengeCardStatusContainer = styled.div`
  display: flex;
  justify-content: space-between;
  p {
    margin: 0;
  }
`;

const ChallengeCard = ({ challenge }) => {
  // useEffect(() => {
  //   aos.init({ duration: 1000, offset: 50, once: true });
  // });

  const href = '/challenge/' + challenge.challenge_id;

  const startedAt = new Date(challenge.started_at);
  const finishedAt = new Date(challenge.started_at);
  finishedAt.setDate(startedAt.getDate() + 6);

  let message = '';

  const progress =
    challenge.checkin_count / challenge.requirement >= 1
      ? 1
      : (challenge.checkin_count / challenge.requirement).toFixed(2);

  if (challenge.is_finished === true) {
    if (challenge.is_accomplished) message = '챌린지 성공';
    else message = '챌린지 실패';
  } else if (challenge.is_finished === false) {
    message = `${progress * 100}% 완료`;
  } else {
    if (TODAY < startedAt) {
      message = '진행예정';
    } else if (TODAY <= finishedAt) {
      message = '진행중';
    } else {
      message = '종료';
    }
  }

  return (
    <div>
      <ChallengeCardList>
        <Link to={href}>
          <h3>{challenge.name}</h3>
          <p>
            {`${startedAt.getFullYear()}.${
              startedAt.getMonth() + 1
            }.${startedAt.getDate()}.`}{' '}
            ~{' '}
            {`${finishedAt.getFullYear()}.${
              finishedAt.getMonth() + 1
            }.${finishedAt.getDate()}.`}
          </p>
          <p>주 {challenge.requirement}회</p>
          <ChallengeCardStatusContainer>
            <Highlighted>{message}</Highlighted>
            <p>참여인원: {challenge.join_count}명</p>
          </ChallengeCardStatusContainer>
        </Link>
      </ChallengeCardList>
    </div>
  );
};

export default ChallengeCard;

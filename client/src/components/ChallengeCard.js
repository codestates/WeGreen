import styled from 'styled-components';
import { color, radius } from '../styles';
import { Link } from 'react-router-dom';

const ChallengeCardList = styled.li`
  padding: 1rem;
  background-color: ${color.white};
  border-radius: ${radius};
`;

const Highlighted = styled.p`
  color: ${color.primary};
  font-weight: bold;
`;

const ChallengeCard = ({ challenge }) => {
  return (
    <ChallengeCardList>
      <Link to="/challenge/1">
        <h3>{challenge.name}</h3>
        <p>
          {challenge.started_at} ~ {challenge.started_at}
        </p>
        <p>{challenge.requirement}</p>
        <Highlighted>진행예정</Highlighted>
        <p>참여인원: {challenge.join_count}명</p>
      </Link>
    </ChallengeCardList>
  );
};

export default ChallengeCard;

import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { device, contentWidth } from "../styles";
import SearchBar from "../components/SearchBar";
import ChallengeCard from "../components/ChallengeCard";
import Button from "../components/Button";
import { dummyChallenges } from "../data/dummyData";

const ChallengeListContainer = styled.div`
  padding: 1rem;
  max-width: ${contentWidth};
  margin: 0 auto;

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

const Challenges = () => {
  const navigate = useNavigate();
  return (
    <ChallengeListContainer>
      <SearchBar />
      <ChallengeList>
        {dummyChallenges.map((el) => (
          <ChallengeCard challenge={el} key={el.challenge_id} />
        ))}
      </ChallengeList>
      <Button
        width="60px"
        height="60px"
        content="+"
        handler={() => navigate("/createchallenge")}
      />
    </ChallengeListContainer>
  );
};

export default Challenges;

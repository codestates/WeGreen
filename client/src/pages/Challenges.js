import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { color } from '../styles'
import SearchBar from '../components/SearchBar'
import ChallengeCard from '../components/ChallengeCard'
import Button from "../components/Button";

const ChallengesContainer = styled.div`
    background-color: ${color.white};
`


const Challenges = () => {
    const navigate = useNavigate()
    return (
        <ChallengesContainer>
            <SearchBar />
            <ChallengeCard />
            <Button width="60px" height="60px" content="+" handler={() => navigate("/createchallenge")} />
        </ChallengesContainer>
    )
};

export default Challenges;
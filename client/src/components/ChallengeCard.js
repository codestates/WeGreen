import styled from "styled-components";
import { color } from '../styles'
import { Link } from 'react-router-dom'

const ChallengeCardList = styled.li`
    background-color: ${color.white};
`

const ChallengeCard = () => {
    return (
        <ChallengeCardList>
            <Link to="/challenge/1">Dummy Challenge</Link> 
        </ChallengeCardList>
    )
};

export default ChallengeCard;
import styled from "styled-components";
import { color } from '../styles'

const ChallengeCommentsContainer = styled.div`
    background-color: ${color.white};
`

const ChallengeComments = () => {
    return (
        <ChallengeCommentsContainer>
            ChallengeComments
        </ChallengeCommentsContainer>
    )
};

export default ChallengeComments;
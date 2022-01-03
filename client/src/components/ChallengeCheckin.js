import styled from "styled-components";
import { color } from '../styles'

const ChallengeCheckinContainer = styled.div`
    background-color: ${color.white};
`

const ChallengeCheckin = () => {
    return (
        <ChallengeCheckinContainer>
            ChallengeCheckin
        </ChallengeCheckinContainer>
    )
};

export default ChallengeCheckin;
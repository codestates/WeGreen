import styled from "styled-components";
import { color } from '../styles'

const ChallengeInfoContainer = styled.div`
    background-color: ${color.white};
`

const ChallengeInfo = () => {
    return (
        <ChallengeInfoContainer>
            ChallengeInfo
        </ChallengeInfoContainer>
    )
};

export default ChallengeInfo;
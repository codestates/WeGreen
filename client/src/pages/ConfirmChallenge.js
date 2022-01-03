import styled from "styled-components";
import { color } from '../styles'

import Button from '../components/Button'

const ConfirmChallengeContainer = styled.div`
    background-color: ${color.white};
`

const ConfirmChallenge = () => {
    return (
        <ConfirmChallengeContainer>
            Create Dummy Challenge
            <Button />
            <Button />
        </ConfirmChallengeContainer>
    )
};

export default ConfirmChallenge;
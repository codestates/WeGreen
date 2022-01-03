import styled from "styled-components";
import { color } from '../styles'
import InputForm from '../components/InputForm'
import TextareaForm from '../components/TextareaForm'
import Calendar from '../components/Calendar'
import SelectForm from '../components/SelectForm'
import Button from '../components/Button'

const EditChallengeContainer = styled.div`
    background-color: ${color.white};
`

const EditChallenge = () => {
    return (
        <EditChallengeContainer>
            <InputForm />
            <TextareaForm />
            <Calendar />
            <SelectForm />
            <Button href="/confirmchallenge"/>
        </EditChallengeContainer>
    )
};

export default EditChallenge;
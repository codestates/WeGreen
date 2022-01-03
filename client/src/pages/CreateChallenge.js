import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { color } from '../styles'
import InputForm from '../components/InputForm'
import TextareaForm from '../components/TextareaForm'
import Calendar from '../components/Calendar'
import SelectForm from '../components/SelectForm'
import Button from '../components/Button'

const CreateChallengeContainer = styled.div`
    background-color: ${color.white};
`

const CreateChallenge = () => {
    const navigate = useNavigate()
    return (
        <CreateChallengeContainer>
            <InputForm />
            <TextareaForm />
            <Calendar />
            <SelectForm />
            <Button content="확인" handler={() => navigate("/confirmchallenge")} />
        </CreateChallengeContainer>
    )
};

export default CreateChallenge;
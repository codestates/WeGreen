import styled from "styled-components";
import { color } from '../styles'

const Input = styled.input`
    border: 1px solid ${color.primaryBorder};
`

const InputForm = () => {
    return (
        <Input />
    )
};

export default InputForm;
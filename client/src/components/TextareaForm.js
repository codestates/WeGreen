import styled from "styled-components";
import { color } from '../styles'

const Textarea = styled.textarea`
    border: 1px solid ${color.primaryBorder};
`

const TextareaForm = () => {
    return (
        <Textarea />
    )
};

export default TextareaForm;
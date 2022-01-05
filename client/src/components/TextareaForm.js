import { useState } from "react";
import styled from "styled-components";
import { color, radius } from '../styles'

const Textarea = styled.textarea`
  width: 100%;
  height: 80px;
  padding: 1rem;
  border: 1px solid ${color.primaryBorder};
  border-radius: ${radius};
  font-size: 1rem;
  resize: none;
`

const TextareaForm = ({ defaultValue="", placeholder, handleValue }) => {
    const [input, setInput] = useState(defaultValue)

    const handleOnChange = (event) => {
      handleValue(event.target.value);
      setInput(event.target.value)
    };

    return (
        <Textarea 
            value={input}
            placeholder={placeholder}
            onChange={handleOnChange}
        />
    )
};

export default TextareaForm;
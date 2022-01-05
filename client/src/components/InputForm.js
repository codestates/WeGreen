import { useState } from "react";
import styled from "styled-components";
import { color, radius } from "../styles";

const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 1rem;
  border: 1px solid ${color.primaryBorder};
  border-radius: ${radius};
  font-size: 1rem;
`;

const InputForm = ({ defaultValue="", type='text', placeholder, handleValue }) => {
  const [input, setInput] = useState(defaultValue)

  const handleOnChange = (event) => {
    handleValue(event.target.value);
    setInput(event.target.value)
  };
  

  return (
    <Input
      value={input}
      type={type}
      placeholder={placeholder}
      onChange={handleOnChange}
    />
  );
};

export default InputForm;

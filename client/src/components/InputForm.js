import styled from 'styled-components';
import { color, radius } from '../styles';

const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 1rem;
  border: 1px solid ${color.primaryBorder};
  border-radius: ${radius};
  font-size: 1rem;
`;

const InputForm = ({
  placeholder,
  handleValue,
  handleValid,
  type = 'text',
}) => {
  const handleOnChange = (event) => {
    handleValue(event.target.value);
    handleValid(event.target.value);
  };

  return (
    <Input placeholder={placeholder} onChange={handleOnChange} type={type} />
  );
};

export default InputForm;

import styled from 'styled-components';
import { color, radius } from '../styles';

const TextareaContainer = styled.div`
  width: ${(props) => props.width};
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Textarea = styled.textarea`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: 1rem;
  border: 1px solid ${color.primaryBorder};
  border-radius: ${radius};
  font-size: 1rem;
  resize: none;
`;

const Counter = styled.div`
  position: relative;
  top: -2.5rem;
  padding-right: 1.5rem;
  color: ${(props) => (props.count === 300 ? 'red' : '#81c0ba')};
`;

const TextareaForm = ({
  width = '100%',
  height = '120px',
  value = '',
  placeholder,
  handleValue,
  limit = 300,
}) => {

  const handleOnChange = (event) => {
    if (event.target.value.length <= limit) {
      handleValue(event.target.value);
    }
  };

  return (
    <TextareaContainer width={width}>
      <Textarea
        width={width}
        height={height}
        value={value}
        placeholder={placeholder}
        onChange={handleOnChange}
      ></Textarea>
      <Counter count={value.length}>
        {value.length} / {limit}
      </Counter>
    </TextareaContainer>
  );
};

export default TextareaForm;

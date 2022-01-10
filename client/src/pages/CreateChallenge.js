import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { color } from '../styles';
import InputForm from '../components/InputForm';
import TextareaForm from '../components/TextareaForm';
import Calendar from '../components/Calendar';
import SelectForm from '../components/SelectForm';
import Button from '../components/Button';

const CreateChallengeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  background-color: ${color.white};
`;

const CreateChallenge = () => {
  const navigate = useNavigate();
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const [pickedDate, setPickedDate] = useState(today);
  console.log(pickedDate)

  return (
    <CreateChallengeContainer>
      <InputForm />
      <TextareaForm />
      <Calendar today={today} pickedDate={pickedDate} setPickedDate={setPickedDate} />
      <SelectForm />
      <Button content='확인' handler={() => navigate('/confirmchallenge')} />
    </CreateChallengeContainer>
  );
};

export default CreateChallenge;

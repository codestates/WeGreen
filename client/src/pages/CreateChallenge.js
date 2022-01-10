import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { color, contentWidth, device } from '../styles';
import InputForm from '../components/InputForm';
import TextareaForm from '../components/TextareaForm';
import Calendar from '../components/Calendar';
import SelectForm from '../components/SelectForm';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { ReactComponent as Wave } from '../assets/images/wave.svg';

const Container = styled.div`
  padding-top: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media ${device.laptop} {
    padding-top: 0;
  }
`;

const CreateChallengeContainer = styled.div`
  width: 100%;
  max-width: calc(${contentWidth} / 2);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  gap: 1.5rem;
  background-color: ${color.white};
`;

const TitleContainer = styled.div`
  display: none;

  @media ${device.laptop} {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    padding-top: 2rem;
    h1 {
      color: ${color.white};
      text-align: center;
    }
    background-color: ${color.primary};
  }
`;

const InvalidMessage = styled.p`
  margin: 0;
  padding-left: 1rem;
  color: ${color.warning};
  font-size: 0.875rem;
  word-break: keep-all;
`;

const CreateChallenge = () => {
  const navigate = useNavigate();
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const requirementArr = new Array(7).fill().map((_, i) => i + 1);

  const [challengeInfo, setChallengeInfo] = useState({
    name: '',
    content: '',
    started_at: today,
    requirement: '챌린지 성공 조건',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responseStatus, setResponseStatus] = useState('no status');
  const [isValidChallengeTitle, setIsValidChallengeTitle] = useState(true);
  const [isValidChallengeContent, setIsValidChallengeContent] = useState(true);

  const isValidChallenge = () => {
    if (
      isValidChallengeTitle &&
      isValidChallengeContent &&
      typeof challengeInfo.requirement === 'number'
    ) {
      return true;
    }
    return false;
  };

  const moveToConfirm = () => {
    if (isValidChallenge()) {
      navigate('/confirmchallenge', { state: challengeInfo })
    } else {
      setResponseStatus('wrong challenge info');
      setIsModalOpen(true);
    }
  };

  const onChangeChallengeInfo = (key) => (val) => {
    setChallengeInfo({ ...challengeInfo, [key]: val });
    if (key === 'name') {
      setIsValidChallengeTitle(val.length === 0 || val.length >= 3);
    }
    if (key === 'content') {
      setIsValidChallengeContent(val.length === 0 || val.length >= 10);
    }
  };

  const ModalMessage = ({ status, btnHandler = () => {} }) => {
    switch (status) {
      case 'wrong challenge info':
        return (
          <>
            <p>
              챌린지 정보가 올바르지 않습니다. <br />
              정보를 확인해 주세요.
            </p>
            <Button content='확인' handler={btnHandler} />
          </>
        );
      default:
        return (
          <>
            <p>
              에러가 발생하였습니다. <br />
              다시 시도해 주세요.
            </p>
            <Button content='확인' handler={btnHandler} />
          </>
        );
    }
  };

  return (
    <Container>
      <TitleContainer>
        <h1>챌린지 만들기</h1>
        <Wave width='100%' height='100' fill={color.white} />
      </TitleContainer>
      <CreateChallengeContainer>
        <InputForm
          placeholder='챌린지 제목'
          handleValue={onChangeChallengeInfo('name')}
        />
        {isValidChallengeTitle ? null : (
          <InvalidMessage>
            *챌린지 제목은 최소 3글자 이상이어야 합니다
          </InvalidMessage>
        )}
        <TextareaForm
          height='160px'
          placeholder='챌린지 소개'
          handleValue={onChangeChallengeInfo('content')}
          limit={300}
        />
        {isValidChallengeContent ? null : (
          <InvalidMessage>
            *챌린지 소개는 최소 10글자 이상이어야 합니다
          </InvalidMessage>
        )}
        <Calendar
          today={today}
          pickedDate={challengeInfo.started_at}
          setPickedDate={onChangeChallengeInfo('started_at')}
        />
        <SelectForm
          options={requirementArr}
          requirement={challengeInfo.requirement}
          setRequirement={onChangeChallengeInfo('requirement')}
        />
        <Button content='확인' handler={moveToConfirm} />
      </CreateChallengeContainer>
      {isModalOpen ? (
        <Modal closeModal={setIsModalOpen}>
          <ModalMessage
            status={responseStatus}
            btnHandler={() => setIsModalOpen(false)}
          />
        </Modal>
      ) : null}
    </Container>
  );
};

export default CreateChallenge;

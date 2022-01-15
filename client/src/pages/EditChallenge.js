import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { changeTitle } from '../actions';
import styled from 'styled-components';
import { color, contentWidth, device } from '../styles';
import InputForm from '../components/InputForm';
import TextareaForm from '../components/TextareaForm';
import Calendar from '../components/Calendar';
import SelectForm from '../components/SelectForm';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { ReactComponent as Wave } from '../assets/images/wave.svg';
import { TODAY } from '../data/dummyData';

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

const EditChallengeContainer = styled.div`
  width: 100%;
  max-width: calc(${contentWidth} / 2);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  gap: 1.5rem;
  background-color: ${color.white};
`;

const InvalidMessage = styled.p`
  margin: 0;
  padding-left: 1rem;
  color: ${color.warning};
  font-size: 0.875rem;
  word-break: keep-all;
`;

const EditChallenge = () => {
  const dispatch = useDispatch()
  dispatch(changeTitle('Edit Challenge'))

  const loginState = useSelector((state) => state.userReducer);
  const { state } = useLocation();

  const requirementArr = new Array(7).fill().map((_, i) => i + 1);

  const navigate = useNavigate();

  useEffect(() => {
    if (!loginState.isLogin) {
      navigate('/login');
    }
    if (!state) {
      navigate('/');
    }
    // eslint-disable-next-line
  }, []);

  const info = state
    ? {
        challenge_id: state.challenge_id,
        name: state.name,
        content: state.content,
        started_at:
          typeof state.started_at === 'string'
            ? new Date(state.started_at)
            : state.started_at,
        requirement: Number(state.requirement),
      }
    : {
        challenge_id: -1,
        name: '',
        content: '',
        started_at: TODAY,
        requirement: '챌린지 성공 조건',
      };

  const [challengeInfo, setChallengeInfo] = useState(info);

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
      navigate('/confirmchallenge', { state: challengeInfo });
    } else {
      setResponseStatus('wrong challenge info');
      setIsModalOpen(true);
    }
  };

  const onChangeChallengeInfo = (key) => (val) => {
    setChallengeInfo({ ...challengeInfo, [key]: val });
    if (key === 'name') {
      setIsValidChallengeTitle(
        val.length === 0 || val.length >= 3 || val.length <= 80
      );
    }
    if (key === 'content') {
      setIsValidChallengeContent(
        val.length === 0 || val.length >= 10 || val.length >= 80
      );
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
        <h1>챌린지 수정</h1>
        <Wave width='100%' height='100' fill={color.white} />
      </TitleContainer>
      <EditChallengeContainer>
        <InputForm
          value={challengeInfo.name}
          placeholder='챌린지 제목'
          handleValue={onChangeChallengeInfo('name')}
        />
        {isValidChallengeTitle ? null : (
          <InvalidMessage>
            *챌린지 제목은 최소 3글자 이상, <br /> 최대 80글자 이하여야 합니다.
          </InvalidMessage>
        )}
        <TextareaForm
          height='160px'
          value={challengeInfo.content}
          placeholder='챌린지 소개'
          handleValue={onChangeChallengeInfo('content')}
          limit={300}
        />
        {isValidChallengeContent ? null : (
          <InvalidMessage>
            *챌린지 소개는 최소 10글자 이상, <br /> 최대 80글자 이하여야 합니다.
          </InvalidMessage>
        )}
        <Calendar
          pickedDate={challengeInfo.started_at}
          setPickedDate={onChangeChallengeInfo('started_at')}
        />
        <SelectForm
          options={requirementArr}
          requirement={challengeInfo.requirement}
          setRequirement={onChangeChallengeInfo('requirement')}
        />
        <Button content='확인' handler={moveToConfirm} />
      </EditChallengeContainer>
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

export default EditChallenge;

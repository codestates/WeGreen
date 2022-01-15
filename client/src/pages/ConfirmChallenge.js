import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { changeTitle } from '../actions';
import { createChallenge, editChallenge } from '../apis';
import styled from 'styled-components';
import { color, contentWidth, device, radius } from '../styles';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { ReactComponent as Wave } from '../assets/images/wave.svg';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const ConfirmChallengeContainer = styled.div`
  width: 100%;
  min-width: 300px;
  max-width: calc(${contentWidth} / 2);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0 1rem 0;
  gap: 1.5rem;
  background-color: ${color.white};
`;

const ChallengeInfoContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
  border: 1px solid ${color.primaryBorder};
  border-radius: ${radius};
`;

const ChallengeInfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  & > h4 {
    color: ${color.primary};
  }
`;

const MessageContainer = styled.div`
  word-break: keep-all;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  gap: 1rem;
`;

const ConfirmChallenge = () => {
  const dispatch = useDispatch()
  dispatch(changeTitle('Confirm Challenge'))

  const loginState = useSelector((state) => state.userReducer);
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loginState.isLogin) {
      navigate('/login');
    }
    if (!state) {
      navigate('/createchallenge');
    }
    // eslint-disable-next-line
  }, []);

  const info = state
    ? state
    : {
        name: '',
        content: '',
        started_at: new Date(),
        requirement: 7,
      };

  // eslint-disable-next-line
  const [challengeInfo, setChallengeInfo] = useState(info);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responseStatus, setResponseStatus] = useState('no status');

  const startedAt = new Date(challengeInfo.started_at);
  const finishedAt = new Date(challengeInfo.started_at);
  finishedAt.setDate(startedAt.getDate() + 6);

  const requestCreateChallenge = () => {
    if (!info.challenge_id) {
      createChallenge(challengeInfo)
        .then((result) => {
          setResponseStatus('success create challenge');
          setIsModalOpen(true);
          setTimeout(() => navigate(`/challenge/${result.data.challenge_id}`), 1000);          
        })
        .catch((err) => {
          if (err.response.status === 401) {
            setResponseStatus('unauthorized');
            setIsModalOpen(true);
          } else {
            setResponseStatus('no status');
            setIsModalOpen(true);
          }
        });
    } else {
      editChallenge(challengeInfo)
        .then((result) => {
          setResponseStatus('success edit challenge');
          setIsModalOpen(true);
          setTimeout(() => navigate(`/challenge/${result.data.challenge_id}`), 1000);     
        })
        .catch((err) => {
          if (err.response.status === 401) {
            setResponseStatus('unauthorized');
            setIsModalOpen(true);
          } else {
            setResponseStatus('no status');
            setIsModalOpen(true);
          }
        });
    }
  }

  const ModalMessage = ({ status, btnHandler = () => {} }) => {
    switch (status) {
      case 'success create challenge':
        return (
          <>
            <p>챌린지가 생성되었습니다.</p>
            <Button content='확인' handler={btnHandler} />
          </>
        );
      case 'success edit challenge':
        return (
          <>
            <p>챌린지가 수정되었습니다.</p>
            <Button content='확인' handler={btnHandler} />
          </>
        );
      case 'unauthorized':
        return (
          <>
            <p>
              현재 비밀번호가 일치하지 않거나 <br />
              로그인이 만료되었습니다. <br />
              다시 시도해주세요.
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
      <ConfirmChallengeContainer>
        <ChallengeInfoContainer>
          <ChallengeInfoList>
            <h4>챌린지 제목</h4>
            {challengeInfo.name}
          </ChallengeInfoList>
          <ChallengeInfoList>
            <h4>챌린지 설명</h4>
            {challengeInfo.content}
          </ChallengeInfoList>
          <ChallengeInfoList>
            <h4>챌린지 기간</h4>
            {startedAt.toLocaleDateString('ko-KR', { timezone: 'UTC' })} -{' '}
            {finishedAt.toLocaleDateString('ko-KR', { timezone: 'UTC' })}
          </ChallengeInfoList>
          <ChallengeInfoList>
            <h4>챌린지 성공 조건</h4>주 {challengeInfo.requirement}회 체크인
          </ChallengeInfoList>
        </ChallengeInfoContainer>
        <MessageContainer>
          다른 참가자가 챌린지에 참여한 후에는 <br />
          내용을 수정할 수 없습니다. <br />
          이대로 챌린지를 {!info.challenge_id ? "생성" : "수정"}할까요?
        </MessageContainer>
        <ButtonContainer>
          <Button
            content='아니오'
            color='tertiary'
            handler={() => {
                if (!info.challenge_id) {
                  navigate('/createchallenge', { state: challengeInfo })
                } else {
                  navigate(`/editchallenge/${challengeInfo.challenge_id}`, { state: challengeInfo })
                }
              }
            }
          />
          <Button content='네' handler={requestCreateChallenge} />
        </ButtonContainer>
      </ConfirmChallengeContainer>
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

export default ConfirmChallenge;

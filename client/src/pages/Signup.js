import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { changeTitle } from '../actions';
import styled from 'styled-components';
import InputForm from '../components/InputForm';
import Button from '../components/Button';
import BtnInsideInput from '../components/BtnInsideInput';
import SocialBtn from '../components/SocialBtn';
import Modal from '../components/Modal';
import { ReactComponent as Wave } from '../assets/images/wave.svg';
import { color, device, radius, boxShadow } from '../styles';
import mainIllust from '../assets/images/main_illust.png';
import kakaoIcon from '../assets/images/login_icon_kakao.svg';
import googleIcon from '../assets/images/login_icon_google.svg';
import naverIcon from '../assets/images/login_icon_naver.svg';
import {
  requestKakaoLogin,
  requestGoogleLogin,
  requestNaverLogin,
  requestSignup,
  requestSendingConfirmEmail,
  requestCheckingConfirmCode,
} from '../apis';

const Container = styled.div`
  @media ${device.laptop} {
    width: 100%;
    height: calc(100vh - 60px);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${color.primaryLight};
  }
`;

const SignupContainer = styled.div`
  background-color: ${color.white};

  @media ${device.laptop} {
    display: grid;
    grid-template-columns: 2fr 1fr;
    width: 980px;
    height: 600px;
    border-radius: ${radius};
    box-shadow: ${boxShadow};
    overflow: hidden;
  }
`;

const IllustSection = styled.section`
  display: none;

  @media ${device.laptop} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    width: 100%;
    background-color: ${color.primary};
    color: ${color.white};
    text-align: center;
    img {
      width: 75%;
      padding: 1rem;
    }
  }
`;

const SignupSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;

  @media ${device.laptop} {
    justify-content: flex-start;
    padding: 1rem 0;
    overflow-y: auto;
  }
`;

const TitleContainer = styled.div`
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

  @media ${device.laptop} {
    h1 {
      color: ${color.primary};
    }
    svg {
      display: none;
    }
    background-color: transparent;
  }
`;

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  max-width: 460px;
  margin-top: -1.5rem;
  padding: 0 1rem;

  @media ${device.laptop} {
    margin-top: 1rem;
  }
`;

const InvalidMessage = styled.p`
  margin: 0;
  padding-left: 1rem;
  color: ${color.warning};
  font-size: 0.875rem;
`;

const DescriptionMessage = styled.p`
  margin: 0;
  padding-left: 1rem;
  font-size: 0.875rem;
  span {
    font-weight: bold;
    color: ${color.warning};
  }
`;

const Divider = styled.div`
  position: relative;
  width: 100%;
  max-width: 460px;
  height: 0;
  padding: 0 1rem;
  text-align: center;

  span {
    display: inline-block;
    position: relative;
    top: -10px;
    padding: 0 1rem;
    background-color: ${color.white};
    color: ${color.primary};
  }

  &::before {
    content: '';
    display: block;
    border-bottom: 1px solid ${color.primaryBorder};
  }
`;

const SocialContainer = styled.div``;

const ColoredSpan = styled.span`
  color: ${color.primary};
`;

const InputAndBtnContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ModalMessage = ({ status }) => {
  const navigate = useNavigate();
  switch (status) {
    case 'empty input':
      return <p>반드시 모든 칸을 입력해야 합니다.</p>;
    case 'email not confirmed':
      return <p>이메일 인증을 완료해주세요.</p>;
    case 'wrong code':
      return (
        <p>
          인증번호가 일치하지 않습니다.
          <br />
          다시 입력해주세요.
        </p>
      );
    case 'created':
      return (
        <>
          <p>회원가입이 성공적으로 완료되었습니다.</p>
          <Button
            content='로그인하러 가기'
            handler={() => navigate('/login')}
          ></Button>
        </>
      );
    case 'conflict':
      return (
        <>
          <p>이미 회원가입된 이메일입니다.</p>{' '}
          <Button
            content='로그인하러 가기'
            handler={() => navigate('/login')}
          ></Button>
        </>
      );
    case 'network error':
      return (
        <p>
          네트워크 에러가 발생하여 로그인이 실패하였습니다. <br />
          다시 시도해 주세요.
        </p>
      );
    default:
      return (
        <p>
          에러가 발생하여 회원가입을 완료할 수 없습니다. <br />
          다시 시도해 주세요.
        </p>
      );
  }
};

const Signup = () => {
  const dispatch = useDispatch();
  dispatch(changeTitle('WeGreen | 회원가입'));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responseStatus, setResponseStatus] = useState('no status');

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidUsername, setIsValidUsername] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidPasswordConfirm, setIsValidPasswordConfirm] = useState(true);

  const [code, setCode] = useState('');
  const [confirmBtnMessage, setConfirmBtnMessage] = useState('인증');
  const [isCodeInputOpen, setIsCodeInputOpen] = useState(false);
  const [isValidCode, setIsValidCode] = useState(false);
  const [countdown, setCountdown] = useState('00:20');
  const [isValidTime, setIsValidTime] = useState(false);
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);

  const onChangeEmail = (val) => {
    setEmail(val);
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!emailRegex.test(val)) {
      setIsValidEmail(false);
    } else {
      setIsValidEmail(true);
    }
  };

  const onChangeCode = (val) => {
    setCode(val);
    const codeRegex = /^[0-9]{6}$/;
    if (!codeRegex.test(val)) {
      setIsValidCode(false);
    } else {
      setIsValidCode(true);
    }
  };

  const onChangeUsername = (val) => {
    setUsername(val);
    const usernameRegex = /^[가-힣a-zA-Z]{2,15}$/;
    if (!usernameRegex.test(val)) {
      setIsValidUsername(false);
    } else {
      setIsValidUsername(true);
    }
  };

  const onChangePassword = (val) => {
    setPassword(val);
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*?])[A-Za-z\d!@#$%^&*?]{8,}$/;
    if (!passwordRegex.test(val)) {
      setIsValidPassword(false);
    } else {
      setIsValidPassword(true);
    }
  };

  const onChangePasswordConfirm = (val) => {
    setPasswordConfirm(val);
    if (password !== val) {
      setIsValidPasswordConfirm(false);
    } else {
      setIsValidPasswordConfirm(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      // 입력칸이 하나라도 비어있는 경우
      email === '' ||
      username === '' ||
      password === '' ||
      passwordConfirm === ''
    ) {
      setResponseStatus('empty input');
      setIsModalOpen(true);
      return;
    }
    if (!isEmailConfirmed) {
      setResponseStatus('email not confirmed');
      setIsModalOpen(true);
    }
    if (
      // 입력값이 모두 유효한 경우
      isValidEmail &&
      isValidUsername &&
      isValidPassword &&
      isValidPasswordConfirm &&
      isEmailConfirmed
    ) {
      requestSignup(email, username, password).then((result) => {
        if (!result.status) {
          setResponseStatus('network error');
        } else if (result.status === 201) {
          setResponseStatus('created');
        } else if (result.status === 409) {
          setResponseStatus('conflict');
        } else if (result.status === 500) {
          setResponseStatus('server error');
        }
        setIsModalOpen(true);
      });
    }
  };

  const handleEmailConfirm = (event) => {
    event.preventDefault();
    requestSendingConfirmEmail(email).then((result) => {
      setIsCodeInputOpen(true);
      setIsValidTime(true);
      setConfirmBtnMessage('재전송');
    });
  };
  const handleCodeConfirm = (event) => {
    event.preventDefault();
    requestCheckingConfirmCode(email, code).then((result) => {
      if (result.status === 201) {
        setIsEmailConfirmed(true);
        setConfirmBtnMessage('인증완료');
        setIsCodeInputOpen(false);
      } else if (result.status === 401) {
        setResponseStatus('wrong code');
        setIsModalOpen(true);
      }
    });
  };

  useEffect(() => {
    if (isValidTime) {
      let intervalId = setInterval(() => {
        let [min, sec] = countdown.split(':').map((el) => parseInt(el, 10));
        if (sec > 0) {
          sec--;
        }
        if (sec === 0) {
          if (min === 0) {
            setIsValidTime(false);
            min = 0;
            sec = 20;
            clearInterval(intervalId);
          } else {
            min--;
            sec = 59;
          }
        }
        setCountdown(`0${min}:${sec < 10 ? '0' : ''}${sec}`);
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isValidTime, countdown]);

  return (
    <Container>
      <SignupContainer>
        <IllustSection>
          <img src={mainIllust} alt='WeGreen 메인 일러스트' />
          <h3>환경을 지키는 습관, WeGreen과 함께 만들어요</h3>
          <p>
            실천하기 쉽도록 챌린지는 일주일 단위로 진행됩니다.
            <br />
            챌린지를 성공하면 뱃지가 주어져요. 뱃지들을 모아 마이페이지를
            꾸며보세요.
          </p>
        </IllustSection>
        <SignupSection>
          <TitleContainer>
            <h1>회원가입</h1>
            <Wave width='100%' height='100' fill={color.white} />
          </TitleContainer>
          <SignupForm>
            <BtnInsideInput
              value={email}
              type='email'
              placeholder='이메일'
              isInputActive={!isEmailConfirmed}
              handleValue={onChangeEmail}
              btnContent={confirmBtnMessage}
              isBtnActive={email !== '' && isValidEmail && !isEmailConfirmed}
              handler={handleEmailConfirm}
            />
            {isValidEmail ? null : (
              <InvalidMessage>*이메일 형식이 유효하지 않습니다.</InvalidMessage>
            )}
            {isCodeInputOpen ? (
              <>
                {' '}
                <BtnInsideInput
                  value={code}
                  type='text'
                  placeholder='인증번호'
                  handleValue={onChangeCode}
                  btnContent='확인'
                  isBtnActive={code !== '' && isValidCode && isValidTime}
                  handler={handleCodeConfirm}
                />
                {isValidTime ? (
                  <DescriptionMessage>
                    이메일로 전송된 인증번호 4자리를 입력하세요.
                    <br />
                    유효시간 <span>{countdown}</span>
                  </DescriptionMessage>
                ) : (
                  <DescriptionMessage>
                    유효시간이 만료되었습니다.
                    <br />
                    인증번호를 재전송하세요.
                  </DescriptionMessage>
                )}
              </>
            ) : null}

            <InputForm
              value={username}
              placeholder='닉네임'
              handleValue={onChangeUsername}
            />
            {isValidUsername ? null : (
              <InvalidMessage>
                *닉네임은 한글 또는 영문 대소문자 2~15자리만 사용 가능합니다.
              </InvalidMessage>
            )}
            <InputForm
              value={password}
              placeholder='비밀번호'
              handleValue={onChangePassword}
              type='password'
            />
            {isValidPassword ? null : (
              <InvalidMessage>
                *비밀번호는 최소 8자리 이상이어야 하며 영문자, 숫자,
                특수문자(!@#$%^&*?)가 1개 이상 사용되어야 합니다.
              </InvalidMessage>
            )}
            <InputForm
              value={passwordConfirm}
              placeholder='비밀번호 확인'
              handleValue={onChangePasswordConfirm}
              type='password'
            />
            {isValidPasswordConfirm ? null : (
              <InvalidMessage>*비밀번호가 다릅니다.</InvalidMessage>
            )}
            <Button content='회원가입' handler={handleSubmit}></Button>
          </SignupForm>
          <Divider>
            <span>or</span>
          </Divider>
          <SocialContainer>
            <SocialBtn image={kakaoIcon} onClick={requestKakaoLogin} />
            <SocialBtn image={naverIcon} onClick={requestNaverLogin} />
            <SocialBtn
              image={googleIcon}
              onClick={requestGoogleLogin}
              hasBorder={true}
            />
          </SocialContainer>
          <Link to='/login'>
            <ColoredSpan>
              이미 회원이신가요? <strong>로그인</strong>
            </ColoredSpan>
          </Link>
        </SignupSection>
      </SignupContainer>
      {isModalOpen ? (
        <Modal closeModal={setIsModalOpen}>
          <ModalMessage status={responseStatus} />
        </Modal>
      ) : null}
    </Container>
  );
};

export default Signup;

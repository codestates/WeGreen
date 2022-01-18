import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import InputForm from '../components/InputForm';
import Button from '../components/Button';
import SocialBtn from '../components/SocialBtn';
import Modal from '../components/Modal';
import { ReactComponent as Wave } from '../assets/images/wave.svg';
import mainIllust from '../assets/images/main_illust.png';
import kakaoIcon from '../assets/images/login_icon_kakao.svg';
import googleIcon from '../assets/images/login_icon_google.svg';
import naverIcon from '../assets/images/login_icon_naver.svg';
import { color, device, radius, boxShadow } from '../styles';
import {
  requestKakaoLogin,
  requestNaverLogin,
  requestGoogleLogin,
  requestLogin,
} from '../apis';
import { login, changeTitle } from '../actions';

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

const LoginContainer = styled.div`
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

const LoginSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;

  @media ${device.laptop} {
    justify-content: center;
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

const LoginForm = styled.form`
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

const ModalMessage = ({ status }) => {
  switch (status) {
    case 'empty input':
      return <p>반드시 모든 칸을 입력해야 합니다.</p>;
    case 'unauthorized':
      return (
        <p>
          이메일 또는 비밀번호가 잘못되었습니다.
          <br />
          다시 시도해 주세요.
        </p>
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
          에러가 발생하여 로그인이 실패하였습니다. <br />
          다시 시도해 주세요.
        </p>
      );
  }
};

const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  dispatch(changeTitle('Login'));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responseStatus, setResponseStatus] = useState('no status');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmptyEmail, setIsEmptyEmail] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isEmptyPassword, setIsEmptyPassword] = useState(false);

  // const onChangeEmail = (val) => {
  //   setEmail(val);
  //   setIsEmptyEmail(val === '');
  // };
  const onChangeEmail = (val) => {
    setEmail(val);
    setIsEmptyEmail(val === '');
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!emailRegex.test(val)) {
      setIsValidEmail(false);
    } else {
      setIsValidEmail(true);
    }
  };

  const onChangePassword = (val) => {
    setPassword(val);
    setIsEmptyPassword(val === '');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email === '') {
      setIsEmptyEmail(true);
      setResponseStatus('empty input');
      setIsModalOpen(true);
    } else if (password === '') {
      setIsEmptyPassword(true);
      setResponseStatus('empty input');
      setIsModalOpen(true);
    } else {
      requestLogin(email, password).then((result) => {
        if (!result.status) {
          setResponseStatus('network error');
          setIsModalOpen(true);
        } else if (result.status === 200) {
          setResponseStatus('ok');
          dispatch(login(result.data.data));
          navigate('/');
        } else if (result.status === 401) {
          setResponseStatus('unauthorized');
          setIsModalOpen(true);
        } else if (result.status === 500) {
          setResponseStatus('server error');
          setIsModalOpen(true);
        }
      });
    }
  };

  return (
    <Container>
      <LoginContainer>
        <IllustSection>
          <img src={mainIllust} />
          <h3>환경을 위한 챌린지, 지금 시작하세요</h3>
          <p>
            작은 실천들이 모여 환경을 지키는 큰 힘이 됩니다. <br />
            다른 사람들과 함께 챌린지를 진행하며 서로를 응원해요.
          </p>
        </IllustSection>
        <LoginSection>
          <TitleContainer>
            <h1>로그인</h1>
            <Wave width='100%' height='100' fill={color.white} />
          </TitleContainer>
          <LoginForm>
            <InputForm
              value={email}
              placeholder='이메일'
              handleValue={onChangeEmail}
            />
            {isEmptyEmail ? (
              <InvalidMessage>*이메일을 입력해 주세요.</InvalidMessage>
            ) : isValidEmail ? null : (
              <InvalidMessage>*이메일 형식이 유효하지 않습니다.</InvalidMessage>
            )}
            <InputForm
              value={password}
              placeholder='비밀번호'
              handleValue={onChangePassword}
              type='password'
            />
            {isEmptyPassword ? (
              <InvalidMessage>*비밀번호를 입력해 주세요.</InvalidMessage>
            ) : null}
            <Button content='로그인' handler={handleSubmit}></Button>
          </LoginForm>
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
          <Link to='/signup'>
            <ColoredSpan>
              아직 회원이 아니신가요? <strong>회원가입</strong>
            </ColoredSpan>
          </Link>
        </LoginSection>
      </LoginContainer>
      {isModalOpen ? (
        <Modal closeModal={setIsModalOpen}>
          <ModalMessage status={responseStatus} />
        </Modal>
      ) : null}
    </Container>
  );
};

export default Login;

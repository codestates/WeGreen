import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { color } from '../styles';
import InputForm from '../components/InputForm';
import Button from '../components/Button';
import SocialBtn from '../components/SocialBtn';
import { ReactComponent as Wave } from '../assets/images/wave.svg';
import { requestSignup } from '../apis';

const SignupContainer = styled.div`
  background-color: ${color.white};
`;

const IllustSection = styled.section``;

const SignupSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
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
`;

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  max-width: 460px;
  margin-top: -1.5rem;
  padding: 0 1rem;
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

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidUsername, setIsValidUsername] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidPasswordConfirm, setIsValidPasswordConfirm] = useState(true);

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
    console.log('pw', password, 'pwr', passwordConfirm);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    requestSignup(email, username, password);
  };

  return (
    <SignupContainer>
      <IllustSection></IllustSection>
      <SignupSection>
        <TitleContainer>
          <h1>회원가입</h1>
          <Wave width="100%" height="100" fill={color.white} />
        </TitleContainer>
        <SignupForm>
          <InputForm placeholder="이메일" handleValue={onChangeEmail} />
          {isValidEmail ? null : (
            <InvalidMessage>*이메일 형식이 유효하지 않습니다.</InvalidMessage>
          )}
          <InputForm placeholder="닉네임" handleValue={onChangeUsername} />
          {isValidUsername ? null : (
            <InvalidMessage>
              *닉네임은 한글 또는 영문 대소문자 2~15자리만 사용 가능합니다.
            </InvalidMessage>
          )}
          <InputForm
            placeholder="비밀번호"
            handleValue={onChangePassword}
            type="password"
          />
          {isValidPassword ? null : (
            <InvalidMessage>
              *비밀번호는 최소 8자리 이상이어야 하며 영문자, 숫자,
              특수문자(!@#$%^&*?)가 1개 이상 사용되어야 합니다.
            </InvalidMessage>
          )}
          <InputForm
            placeholder="비밀번호 확인"
            handleValue={onChangePasswordConfirm}
            type="password"
          />
          {isValidPasswordConfirm ? null : (
            <InvalidMessage>*비밀번호가 다릅니다.</InvalidMessage>
          )}
          <Button content="회원가입" handler={handleSubmit}></Button>
        </SignupForm>
        <Divider>
          <span>or</span>
        </Divider>
        <SocialContainer>
          <SocialBtn />
          <SocialBtn />
          <SocialBtn />
        </SocialContainer>
        <Link to="/login">
          <ColoredSpan>
            이미 회원이신가요? <strong>로그인</strong>
          </ColoredSpan>
        </Link>
      </SignupSection>
    </SignupContainer>
  );
};

export default Signup;

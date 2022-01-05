import { useState } from 'react';
import styled from 'styled-components';
import { color } from '../styles';
import InputForm from '../components/InputForm';

const LoginContainer = styled.div`
  background-color: ${color.white};
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  console.log(email);

  return (
    <LoginContainer>
      Login
      <InputForm placeholder="이메일" handleValue={setEmail} />
    </LoginContainer>
  );
};

export default Login;

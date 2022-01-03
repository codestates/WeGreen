import styled from "styled-components";
import { color } from '../styles'

const LoginContainer = styled.div`
    background-color: ${color.white};
`

const Login = () => {
    return (
        <LoginContainer>
            Login
        </LoginContainer>
    )
};

export default Login;
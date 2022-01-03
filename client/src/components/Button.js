import styled from "styled-components";
import { color } from '../styles'

const ButtonTemplate = styled.button`
    width: ${props => props.width};
    height: ${props => props.height};
    border-radius: 20px;
    background-color: ${props => color[props.color]};
    cursor: pointer;
`

const Button = ({ width="100%", height="40px", color="secondary", content="BUTTON", handler= () => {} }) => {
    return (
        <ButtonTemplate width={width} height={height} color={color} onClick={handler}>{content}</ButtonTemplate>
    )
};

export default Button;
import styled from "styled-components";
import { color } from '../styles';
import { Link } from "react-router-dom";

const NavigationContainer = styled.div`
    background-color: ${color.primary};
`

const Navigation = () => {
    return (
        <NavigationContainer>
            Navigation
            <nav>
                <Link to="/">HOME</Link>
                <Link to="/login">LOGIN</Link>
                <Link to="/signup">SIGNUP</Link>
                <Link to="/challenges">CHALLENGES</Link>
            </nav>
        </NavigationContainer>
    )
};

export default Navigation;
import styled from "styled-components";
import { color } from '../styles'

const HomeContainer = styled.div`
    background-color: ${color.primaryLight};
`

const Home = () => {
    return (
        <HomeContainer>
            HOME
        </HomeContainer>
    )
}

export default Home;
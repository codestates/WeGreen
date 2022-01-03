import styled from "styled-components";
import { color } from '../styles'

const SearchBarContainer = styled.div`
    background-color: ${color.white};
`

const SearchBar = () => {
    return (
        <SearchBarContainer>
            Search bar
        </SearchBarContainer>
    )
};

export default SearchBar;
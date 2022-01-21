import { useState } from 'react';
import styled from 'styled-components';
import { color, device, radius } from '../styles';
import { ReactComponent as SearchIcon } from '../assets/images/icon_search.svg';

const SearchBarContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 1rem;
  border: 1px solid ${color.primaryBorder};
  border-radius: ${radius};
  font-size: 1rem;
`;

const SearchBtn = styled.button`
  position: absolute;
  top: 3px;
  right: 3px;
  width: 34px;
  height: 34px;
  background-color: ${color.primary};
  border-radius: 17px;
  cursor: pointer;

  span {
    display: none;
    color: ${color.white};
  }

  @media ${device.tablet} {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    width: fit-content;
    padding: 0.75rem;

    span {
      display: inline-block;
      font-size: 1rem;
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: black;
    border-radius: 17px;
    opacity: 0;
    transition: all 0.2s ease;
  }

  &:hover {
    &::after {
      opacity: 0.1;
    }
  }
`;

const SearchBar = ({ handleValue, handleSubmit }) => {
  // eslint-disable-next-line
  const [input, setInput] = useState('');
  const handleInputChange = (event) => {
    handleValue(event.target.value);
    setInput(event.target.value);
  };

  const handlePressEnter = (event) => {
    if (event.keyCode === 13) handleSubmit();
  };
  return (
    <SearchBarContainer>
      <SearchInput
        placeholder='챌린지를 검색하세요'
        onChange={handleInputChange}
        onKeyDown={handlePressEnter}
      ></SearchInput>
      <SearchBtn onClick={handleSubmit}>
        <SearchIcon width='20' height='20' fill={color.white} />
        <span>검색</span>
      </SearchBtn>
    </SearchBarContainer>
  );
};

export default SearchBar;

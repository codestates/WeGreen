import { useState } from 'react';
import styled from 'styled-components';
import { color, radius } from '../styles';

const SelectContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: column;
  border: 1px solid ${color.primaryBorder};
  border-radius: ${radius};
`;

const DropButton = styled.button`
  width: 100%;
  height: 100%;
  padding: 0 1rem;
  z-index: 999;
  background-color: transparent;
  color: #81c0ba;
  font-size: 1rem;
  text-align: left;
  line-height: 40px;
`;
const OptionsContainer = styled.div`
  position: relative;
  top: -1.5rem;
  width: 100%;
  padding-top: 2rem;
  z-index: 99;
  border: 1px solid ${color.primaryBorder};
  border-top: none;
  border-radius: 0 0 ${radius} ${radius};
  background-color: ${color.white};
`;

const OptionLi = styled.li`
  position: relative;
  width: 100%;
  height: 30px;
  padding: 0 1rem;
  border-radius: ${radius};
  color: ${color.black};
`;

const SelectForm = ({ options, requirement, setRequirement }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleRequirement = (e) => {
    setRequirement(e.target.value);
    handleIsOpen();
  };

  const Options = (
    <OptionsContainer>
      {options.map((option) => {
        return (
          <OptionLi key={option} value={option} onClick={handleRequirement}>
            {option}회 체크인
          </OptionLi>
        );
      })}
    </OptionsContainer>
  );

  return (
    <SelectContainer>
      <DropButton onClick={handleIsOpen}>
        {typeof requirement === 'number'
          ? `주 ${requirement}회 체크인`
          : requirement}
      </DropButton>
      {isOpen ? Options : null}
    </SelectContainer>
  );
};

export default SelectForm;

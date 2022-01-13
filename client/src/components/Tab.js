import { useState } from 'react';
import styled from 'styled-components';
import { color, device, contentWidth } from '../styles';
const TabContainer = styled.div`
  width: 100%;
  max-width: ${contentWidth};
  display: flex;
  justify-content: space-evenly;
  margin-top: 1rem;
  word-break: keep-all;
`;

const TabBtn = styled.button`
  padding: 0.25rem;
  background: none;
  border-bottom: ${(props) =>
    props.active ? `2px solid ${color.primary}` : 'none'};
  color: ${color.primary};
  font-size: 1rem;
  font-weight: bold;
  opacity: ${(props) => (props.active ? 1 : 0.5)};
  cursor: pointer;

  @media ${device.tablet} {
    padding: 0.5rem;
    font-size: 1.25rem;
  }

  @media ${device.laptop} {
    padding: 0.25rem;
    font-size: 1rem;
  }
`;

const Tab = ({ tabInfo, view, handleView }) => {
  return (
    <TabContainer>
      {tabInfo.map((tab) => (
        <TabBtn
          onClick={() => {
            handleView(tab[0]);
            setCurrentTab(tab[0]);
          }}
          key={tab[1]}
          active={currentTab === tab[0]}
        >
          {tab[1]}
        </TabBtn>
      ))}
    </TabContainer>
  );
};

export default Tab;

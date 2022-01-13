import styled from "styled-components";
import { color, contentWidth, device } from "../styles";

const TabContainer = styled.div`
  width: 100%;
  max-width: ${contentWidth};
  display: flex;
  justify-content: space-evenly;
  margin-top: 1rem;
  word-break: keep-all;
`;

const TabButton = styled.button`
  background-color: transparent;
  font-size: 1.25rem;
  font-weight: ${props => props.current};
  color: ${color.primary};
`

const Tab = ({ tabInfo, view, handleView }) => {
  return (
    <TabContainer>
      {tabInfo.map((tab) => (
        <TabButton
          onClick={() => {
            handleView(tab[0]);
          }}
          key={tab[1]}
          current={tab[0] === view ? "bolder" : null}
        >
          {tab[1]}
        </TabButton>
      ))}
    </TabContainer>
  );
};

export default Tab;

import styled from "styled-components";
import { color, contentWidth } from "../styles";

const TabContainer = styled.div`
  padding: 1rem;
  max-width: ${contentWidth};
  margin: 0 auto;
  display: flex;
  justify-content: space-evenly;
  background-color: ${color.white};
  word-break: keep-all;

  & * {
    font-size: 1.5rem;
  }
`;

const Tab = ({ tabInfo, handleView }) => {
  return (
    <TabContainer>
      {tabInfo.map((tab) => (
        <button
          onClick={() => {
            handleView(tab[0]);
          }}
        >
          {tab[1]}
        </button>
      ))}
    </TabContainer>
  );
};

export default Tab;

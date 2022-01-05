import styled from "styled-components";
import { color, contentWidth, device } from '../styles';

const IllustContainer = styled.div`
  width: 100%; /* 임시 */
  height : 50vh;
  margin: 0 auto;
  padding: 1rem;
  border: 1px solid ${color.primaryBorder};
  background-color: ${color.white};
  
  @media ${device.laptop} {
    width: calc(${contentWidth} * 2 / 3);
    height: 100vh;
  }
`

const Illust = () => {
    return (
        <IllustContainer>
            일러스트
        </IllustContainer>
    )
};

export default Illust;
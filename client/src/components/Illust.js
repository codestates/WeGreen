import styled from "styled-components";
import { color, device } from '../styles';

const IllustContainer = styled.div`
  width: 100vw; /* 임시 */
  height : 50vw;
  min-height: 360px; /* 임시 */
  margin: 0 auto;
  padding: 1rem;
  border: 1px solid ${color.primaryBorder};
  background-color: ${color.white};
  
  @media ${device.laptop} {
    width: 100%;
    height: calc(100vh - 60px);
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
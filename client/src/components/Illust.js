import styled from "styled-components";
import { color, device, contentWidth } from '../styles';

const IllustContainer = styled.div`
  width: 70%; /* 임시 */
  height: 50vh; /* 임시 */
  max-width: ${contentWidth};
  margin: 0 auto;
  padding: 1rem;
  border: 1px solid ${color.primaryBorder};
  background-color: ${color.white};
`

const Illust = () => {
    return (
        <IllustContainer>
            일러스트
        </IllustContainer>
    )
};

export default Illust;
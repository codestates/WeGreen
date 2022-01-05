import styled from "styled-components";
import { color, contentWidth } from '../styles';

const IllustContainer = styled.div`
  width: 70vw; /* 임시 */
  height : calc(70vw * 1);
  max-width: ${contentWidth};
  max-height: ${contentWidth};
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
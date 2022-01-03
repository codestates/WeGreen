import styled from "styled-components";
import { color } from '../styles'

const IllustContainer = styled.div`
    border: 1px solid ${color.primaryBorder};
`

const Illust = () => {
    return (
        <IllustContainer>
            일러스트
        </IllustContainer>
    )
};

export default Illust;
import styled from "styled-components";
import { color } from '../styles'

const TabContainer = styled.div`
    background-color: ${color.white};
`

const Tab = ({ tabInfo, handleView }) => {
    return (
        <TabContainer>
            {tabInfo.map(tab => <button onClick={() => {handleView(tab[0])}}>{tab[1]}</button>)}
        </TabContainer>
    )
};

export default Tab;
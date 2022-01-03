import styled from "styled-components";
import { color } from '../styles'

const SelectContainer = styled.div`
    border: 1px solid ${color.primaryBorder};
`

const SelectForm = () => {
    return (
        <SelectContainer />
    )
};

export default SelectForm;
import styled from "styled-components";
import { color } from '../styles'

const CalendarContainer = styled.div`
    border: 1px solid ${color.primaryBorder};
`

const Calendar = () => {
    return (
        <CalendarContainer>
            달력
        </CalendarContainer>
    )
};

export default Calendar;
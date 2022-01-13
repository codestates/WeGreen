import { useState } from 'react';
import styled from 'styled-components';
import { color, radius } from '../styles';
import { TODAY } from '../data/dummyData';

const CalendarContainer = styled.div`
  width: 100%;
  height: 330px;
  min-width: 300px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: .5rem;
  border: 1px solid ${color.primaryBorder};
  border-radius: ${radius};
`;

const CalendarHeaderSection = styled.section`
  width: 100%;
  padding: .25rem 1rem;
  display: flex;
  justify-content: space-between;
`;

const ChangeMonthButton = styled.button`
  color: ${color.primary};
  background-color: transparent;
  font-weight: bold;
`

const TodayButton = styled.button`
  background-color: transparent;
  font-weight: bold;
`

const CalendarDatesContainer = styled.div`
  width: 100%;
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1rem;
  font-size: 0.875rem;
  text-align: center;
`;

const DayContainer = styled.div`
  width: 100%;
  color: ${(props) => props.days};
`;

const DateContainer = styled.div`
  width: 100%;
  opacity: ${(props) => props.opacity};
  color: ${(props) => props.pickedDate};
  font-weight: ${(props) => props.today};

  &:hover {
    cursor: pointer;
  }
`;

const Divider = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding: 0 1rem;
  text-align: center;

  &::before {
    content: '';
    display: block;
    border-bottom: 1px solid ${color.primaryBorder};
  }
`;

const Calendar = ({ pickedDate, setPickedDate }) => {
  const [viewDate, setViewDate] = useState(TODAY);

  const getDates = () => {
    const prevLast = new Date(viewDate.getFullYear(), viewDate.getMonth(), 0);
    const nowLast = new Date(
      viewDate.getFullYear(),
      viewDate.getMonth() + 1,
      0
    );

    const prevDates = [];
    if (prevLast.getDay() !== 6) {
      for (let i = 0; i < prevLast.getDay() + 1; i++) {
        prevDates.unshift(prevLast.getDate() - i);
      }
    }

    const nowDates = new Array(nowLast.getDate()).fill().map((_, i) => i + 1);
    const nextDates = new Array(6 - nowLast.getDay())
      .fill()
      .map((_, i) => i + 1);

    const dates = [prevDates, nowDates, nextDates];
    return dates;
  };

  const days = ['일', '월', '화', '수', '목', '금', '토'];

  const dates = getDates();

  const handleViewer = (e) => {
    const changed = new Date(viewDate);
    if (e.target.textContent === '<') {
      changed.setMonth(viewDate.getMonth() - 1);
    } else {
      changed.setMonth(viewDate.getMonth() + 1);
    }
    setViewDate(changed);
  };

  const handlePickedDate = (e) => {
    const picked = new Date(viewDate);
    picked.setDate(Number(e.target.textContent));
    // if (TODAY <= picked) {
      setPickedDate(picked);
    // }
  };

  const handleTodayButton = () => {
    setViewDate(TODAY)
  }

  return (
    <CalendarContainer>
      <CalendarHeaderSection>
        <ChangeMonthButton onClick={handleViewer}>&lt;</ChangeMonthButton>
          {viewDate.getFullYear()}-{('0' + (viewDate.getMonth() + 1)).slice(-2)}
          <TodayButton onClick={handleTodayButton}>오늘</TodayButton>
        <ChangeMonthButton onClick={handleViewer}>&gt;</ChangeMonthButton>
      </CalendarHeaderSection>
      <Divider />
      <CalendarDatesContainer>
        {days.map((day, i) => {
          return (
            <DayContainer key={day} days={i % 7 === 0 || i % 7 === 6
              ? 'red'
              : 'null'}>
              {day}
            </DayContainer>
          );
        })}
        {dates.flat().map((date, i) => {
          return (
            <DateContainer
              key={i}
              opacity={
                i < dates[0].length || i > [...dates[0], ...dates[1]].length - 1
                  ? '0.5'
                  : '1'
              }
              today={
                TODAY.getFullYear() === viewDate.getFullYear() &&
                TODAY.getMonth() === viewDate.getMonth() &&
                i === dates[0].length + TODAY.getDate() - 1
                  ? 'bold'
                  : null
              }
              pickedDate={
                pickedDate.getFullYear() === viewDate.getFullYear() &&
                pickedDate.getMonth() === viewDate.getMonth() &&
                i === dates[0].length + pickedDate.getDate() - 1
                  ? 'green'
                  : i % 7 === 0 || i % 7 === 6
                  ? 'red'
                  : 'null'
              }
              onClick={
                i < dates[0].length || i > [...dates[0], ...dates[1]].length - 1
                  ? null
                  : handlePickedDate
              }
            >
              {date}
            </DateContainer>
          );
        })}
      </CalendarDatesContainer>
    </CalendarContainer>
  );
};

export default Calendar;

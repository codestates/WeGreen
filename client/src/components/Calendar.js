import { useState } from 'react';
import styled from 'styled-components';
import { color, radius } from '../styles';
import { TODAY } from '../data/dummyData';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const DateViewContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  color: ${color.primary};
  
  p {
    line-height: 0;
  }
`;
const CalendarContainer = styled.div`
  width: 100%;
  height: 330px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 0.5rem;
  border: 1px solid ${color.primaryBorder};
  border-radius: ${radius};
`;

const CalendarHeaderSection = styled.section`
  width: 100%;
  padding: 0.25rem 1rem;
  display: flex;
  justify-content: space-between;
`;

const ChangeMonthButton = styled.button`
  color: ${color.primary};
  background-color: transparent;
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
`;

const TodayButton = styled.button`
  position: absolute;
  align-self: flex-end;
  margin-top: 0.4rem;
  margin-right: 3rem;
  background-color: transparent;
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }

  @media (min-width: 420px) {
    margin-right: 4rem;
  }
`;

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
  opacity: ${(props) => props.opacity === 'current' ? 1 : 0.5};
  background-color: ${(props) => props.days === 'green' ? props.days : null};
  border: ${(props) => props.today ? '1px solid green' : null};
  border-radius: 10px;
  color: ${(props) => props.days === 'green' ? 'white' : props.days};

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

  const finished = new Date(pickedDate);
  finished.setDate(finished.getDate() + 6);

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
    setViewDate(TODAY);
  };

  return (
    <Container>
      <DateViewContainer>
        <p>챌린지 기간</p>
        <p>
          <strong>
            {pickedDate.toLocaleDateString('ko-KR', { timezone: 'UTC' })} ~{' '}
            {finished.toLocaleDateString('ko-KR', { timezone: 'UTC' })}
          </strong>
        </p>
      </DateViewContainer>
      <CalendarContainer>
        <CalendarHeaderSection>
          <ChangeMonthButton onClick={handleViewer}>&lt;</ChangeMonthButton>
          {viewDate.getFullYear()}. {('0' + (viewDate.getMonth() + 1)).slice(-2)}.
          <ChangeMonthButton onClick={handleViewer}>&gt;</ChangeMonthButton>
        </CalendarHeaderSection>
          <TodayButton onClick={handleTodayButton}>오늘</TodayButton>
        <Divider />
        <CalendarDatesContainer>
          {days.map((day, i) => {
            return (
              <DayContainer
                key={day}
                days={i % 7 === 0 || i % 7 === 6 ? 'red' : 'null'}
              >
                {day}
              </DayContainer>
            );
          })}
          {dates.flat().map((date, i) => {
            return (
              <DateContainer
                key={i}
                opacity={
                  i < dates[0].length ||
                  i > [...dates[0], ...dates[1]].length - 1
                    ? 'not applicable'
                    : 'current'
                }
                days={
                  pickedDate.getFullYear() === viewDate.getFullYear() &&
                  pickedDate.getMonth() === viewDate.getMonth() &&
                  i === dates[0].length + pickedDate.getDate() - 1
                    ? 'green'
                    : i % 7 === 0 || i % 7 === 6
                    ? 'red'
                    : null
                }
                today={
                  TODAY.getFullYear() === viewDate.getFullYear() &&
                  TODAY.getMonth() === viewDate.getMonth() &&
                  i === dates[0].length + TODAY.getDate() - 1
                    ? true
                    : false
                }
                onClick={
                  i < dates[0].length ||
                  i > [...dates[0], ...dates[1]].length - 1
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
    </Container>
  );
};

export default Calendar;

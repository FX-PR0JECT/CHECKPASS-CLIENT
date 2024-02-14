import styled, { css } from 'styled-components';
import { fontSizes, colors } from '../../../Styles/theme';

const TimeTable = () => {
  const days: string[] = ['월', '화', '수', '목', '금', '토'];
  const hours: string[] = Array.from({ length: 13 }, (_, idx) => `${idx + 9}시`);
  const TIMES: string[] = [
    'D0T1130H090',
    'D0T1430H240',
    'D1T1030H090',
    'D1T1400H090',
    'D3T1300H180',
    'D4T1130H090',
    'D4T1500H240',
    'D5T1400H180',
  ];

  const parseTime = (info: string) => {
    const date: number = parseInt(info.substring(1, 2));
    const start: string = info.substring(3, 7);
    const time: number = parseInt(info.substring(8, 11));

    return { date, start, time };
  };

  const timeTables: JSX.Element[] = TIMES.map((el, idx) => {
    const { date, start, time } = parseTime(el);
    return <TimeItem date={date} start={start} time={time} color={idx} />;
  });

  return (
    <TableContainer>
      <Table>
        <thead>
          <TH></TH>
          {days.map((day) => (
            <TH key={day}>{day}</TH>
          ))}
        </thead>
        <tbody>
          {hours.map((hour) => (
            <tr key={hour}>
              <Cells>{hour}</Cells>
              {days.map((day) => (
                <Cell key={day} />
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      {timeTables}
    </TableContainer>
  );
};

export default TimeTable;

interface TimeItemProps {
  date: number;
  start: string;
  time: number;
  color: number;
}

const COLORS: string[] = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

const getTableMarginLeft = (date: number) => {
  return 40 + date * 110 + date / 2.5;
};

const getTableMarginTop = (start: string) => {
  const hour: number = parseInt(start.substring(0, 2));
  const min: number = parseInt(start.substring(2, 4));
  const count: number = (hour - 9) * 2 + min / 30;

  return 25 + count * 23;
};

const getTableHeight = (time: number) => {
  return (time / 30) * 23;
};

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  padding: 3px;
`;

const Table = styled.table`
  width: 700px;
  height: 622px;

  border-collapse: collapse;
  border-style: hidden;

  border-radius: 15px;
  box-shadow: 0px 0px 5px 1px ${colors['shadow-dark']};
`;

const TH = styled.th`
  height: 25px;

  color: ${colors['text-primary']};
  font-size: ${fontSizes.medium};
  font-family: 'AppleGothicR';

  border: 1px solid ${colors['border-default']};
`;

const Cell = styled.td`
  border: 1px solid ${colors['border-default']};
  text-align: center;
`;

const Cells = styled(Cell)`
  width: 40px;
`;

const TimeItem = styled.div<TimeItemProps>`
  width: 110px;
  position: absolute;

  ${({ date }) => css`
    margin-left: ${getTableMarginLeft(date)}px;
  `}
  ${({ start }) => css`
    margin-top: ${getTableMarginTop(start)}px;
  `} 
  ${({ time }) => css`
    height: ${getTableHeight(time)}px;
  `} 
  ${({ color }) => css`
    background-color: ${COLORS[color % COLORS.length]};
  `}
`;

import styled, { css } from 'styled-components';
import { colors, fontSizes } from '@/src/Styles/theme';
import { LectureInfo } from '@/src/types';

interface LectureProps {
  lecture: LectureInfo[];
}

const TimeTable: React.FC<LectureProps> = ({ lecture }) => {
  const days: string[] = ['월', '화', '수', '목', '금', '토'];
  const hours: string[] = Array.from({ length: 13 }, (_, idx) => `${idx + 9}시`);

  const getLectureTable = (lecture: LectureInfo[]) => {
    const lectureTables: Array<[string, string, string, number]> = [];

    lecture.forEach((item: LectureInfo, idx: number) => {
      item.lectureTimes.forEach((time: string) => {
        lectureTables.push([time, item.lectureName, item.lectureRoom, idx]);
      });
    });

    return lectureTables;
  };

  const parseTime = (info: string) => {
    const date: number = parseInt(info.substring(1, 2));
    const start: string = info.substring(3, 7);
    const time: number = parseInt(info.substring(8, 11));

    return { date, start, time };
  };

  const timeTables: JSX.Element[] = getLectureTable(lecture).map((table) => {
    const { date, start, time } = parseTime(table[0]);

    return (
      <TimeItem date={date} start={start} time={time} color={table[3]}>
        <LectureName>{table[1]}</LectureName>
        <LectureRoom>{table[2]}</LectureRoom>
      </TimeItem>
    );
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

const COLORS: string[] = [
  '#FEEAE9',
  '#F0E8E8',
  '#FCEEDC',
  '#FEF8D1',
  '#F1F9D0',
  '#E0F1E9',
  '#DFEDF1',
  '#E0E8F5',
];

const getWidth = (date: number) => {
  if (date === 5) return 107;
  return 110;
};

const getTableMarginLeft = (date: number) => {
  return 40 + date * 110 + date / 1.5;
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

  border-radius: 15px;
  border: 1px solid ${colors['border-default']};
`;

const Table = styled.table`
  width: 700px;
  height: 622px;

  border-collapse: collapse;
  border-style: hidden;

  border-radius: 15px;
  box-shadow: 0px 0px 5px 1px ${colors['shadow-default']};
`;

const TH = styled.th`
  height: 25px;

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
  display: flex;
  flex-direction: column;
  position: absolute;

  overflow: hidden;
  padding: 3px;

  ${({ date }) => css`
    width: ${getWidth(date)}px;
  `}
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

const LectureName = styled.span`
  color: ${colors['text-primary']};
  font-family: 'AppleGothicR';
  font-size: ${fontSizes.medium};
`;

const LectureRoom = styled.span`
  color: ${colors['text-secondary']};
  font-family: 'AppleGothicR';
  font-size: ${fontSizes.small};
`;

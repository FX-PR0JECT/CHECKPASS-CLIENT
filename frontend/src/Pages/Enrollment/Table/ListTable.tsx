import styled from 'styled-components';
import TableHead from './TableHead';
import { TableProps } from '../../../types';

interface TableDataProps {
  flex?: number;
}

const ListTable = ({ data, buttonText, buttonHandler }: TableProps) => {
  return (
    <Table>
      <TableHead />
      <tbody>
        {data.length > 0 ? (
          data.map((lecture, index) => (
            <TableRow key={index}>
              <TableData flex={0.2}>{index + 1}</TableData>
              <TableData>
                <button
                  onClick={() => {
                    buttonHandler(lecture.lectureCode);
                  }}
                >
                  {buttonText}
                </button>
              </TableData>
              <TableData>{lecture.lectureCode}</TableData>
              <TableData>{lecture.division}</TableData>
              <TableData flex={1}>{lecture.lectureName}</TableData>
              <TableData>{lecture.lectureGrade}</TableData>
              <TableData>{lecture.lectureFull}</TableData>
              <TableData>{lecture.lectureCount}</TableData>
              <TableData>{lecture.professorName}</TableData>
              <TableData>{lecture.lectureGrades}</TableData>
              <TableData flex={1}>{lecture.lectureRoom}</TableData>
              <TableData flex={1.2}>{lecture.alphaTimeCodes}</TableData>
              <TableData>{lecture.lectureKind}</TableData>
              <TableData>
                {lecture.dayOrNight === 'day' ? '주간' : '야간'}
              </TableData>
              <TableData>
                <button>강의 계획서</button>
              </TableData>
            </TableRow>
          ))
        ) : (
          <TableRow></TableRow>
        )}
      </tbody>
    </Table>
  );
};

export default ListTable;

const Table = styled.table`
  width: 98%;
  height: 500px;

  font-size: 0.9em;

  border: 1px solid #a39485;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  display: flex;
  width: 100%;
`;

const TableData = styled.td<TableDataProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  flex: ${(props) => props.flex || 0.4};

  padding: 0.8rem 0.3rem;
  text-align: center;

  background: #fff;
  border-bottom: 1px solid #a39485;
`;

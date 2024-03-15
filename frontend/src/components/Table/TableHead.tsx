import styled from 'styled-components';

interface TableDataProps {
  flex?: number;
}

const TableHead = () => {
  return (
    <Th>
      <TableRow>
        <TableHeader flex={0.2}></TableHeader>
        <TableHeader>수강</TableHeader>
        <TableHeader>강의번호</TableHeader>
        <TableHeader>분반</TableHeader>
        <TableHeader flex={1}>강의명</TableHeader>
        <TableHeader>학년</TableHeader>
        <TableHeader>정원</TableHeader>
        <TableHeader>수강 인원</TableHeader>
        <TableHeader>교수명</TableHeader>
        <TableHeader>학점</TableHeader>
        <TableHeader flex={1}>강의실</TableHeader>
        <TableHeader flex={1.2}>강의 시간</TableHeader>
        <TableHeader>이수 구분</TableHeader>
        <TableHeader>주/야 구분</TableHeader>
        <TableHeader>강의 계획서</TableHeader>
      </TableRow>
    </Th>
  );
};

export default TableHead;

const Th = styled.thead`
  position: sticky;
  top: 0;

  background: #edf3ff;
`;

const TableRow = styled.tr`
  display: flex;
  width: 100%;
`;

const TableHeader = styled.th<TableDataProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  flex: ${(props) => props.flex || 0.6};

  padding: 0.8rem 0.3rem;

  border-bottom: 1px solid #a39485;
`;

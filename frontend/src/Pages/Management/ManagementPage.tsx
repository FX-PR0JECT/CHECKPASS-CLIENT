import styled, { ThemeProvider } from 'styled-components';
import useTheme from '@/src/Hooks/useTheme';
import Header from '@/src/components/Header';
import TableHead from '@/src/components/Table/TableHead';

import { MainTheme } from '@/src/Styles/theme';
import { LECTURE_ROOM } from '@/src/constants/lectureRoom';
import { SINGLE_DEPARTMENT } from '@/src/constants/department';
import { FormItem, Label, Input, Select } from './FormItems/FormItem';
import {
  GRADE,
  DIVISION,
  GRADES,
  LECTURE_KIND,
  DAY_OR_NIGHT,
} from '@/src/constants/management';

interface TableDataProps {
  flex?: number;
}

const ManagementPage = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <ThemeProvider theme={isDarkMode ? MainTheme.dark : MainTheme.light}>
      <Container>
        <Header mode={isDarkMode} themeHandler={toggleTheme} />
        <Main>
          <Section>
            <TextContent>
              <Title>개설 강의 등록</Title>
              <button>등록</button>
            </TextContent>
            <RegisterContainer>
              <Line>
                <FormItem>
                  <Label>학과</Label>
                  <Select options={SINGLE_DEPARTMENT} />
                </FormItem>
                <FormItem>
                  <Label>강의명</Label>
                  <Input type="text" placeholder="강의명" />
                </FormItem>
                <FormItem>
                  <Label>강의 코드</Label>
                  <Input type="text" placeholder="강의 코드" />
                </FormItem>
                <FormItem>
                  <Label>교수 아이디</Label>
                  <Input type="text" placeholder="아이디(교번)" />
                </FormItem>
                <FormItem>
                  <Label>강의관</Label>
                  <Select options={LECTURE_ROOM} />
                </FormItem>
                <FormItem>
                  <Label>호실</Label>
                  <Input type="text" placeholder="강의실 호실" />
                </FormItem>
              </Line>
              <Line>
                <FormItem>
                  <Label>학년</Label>
                  <Select options={GRADE} />
                </FormItem>
                <FormItem>
                  <Label>강의 시간</Label>
                  <Input type="text" placeholder="강의 시간" />
                </FormItem>
                <FormItem>
                  <Label>정원</Label>
                  <Input type="text" placeholder="정원" />
                </FormItem>
                <FormItem>
                  <Label>분반</Label>
                  <Select options={DIVISION} />
                </FormItem>
                <FormItem>
                  <Label>학점</Label>
                  <Select options={GRADES} />
                </FormItem>
                <FormItem>
                  <Label>이수 구분</Label>
                  <Select options={LECTURE_KIND} />
                </FormItem>
                <FormItem>
                  <Label>주/야 구분</Label>
                  <Select options={DAY_OR_NIGHT} />
                </FormItem>
              </Line>
            </RegisterContainer>
          </Section>
          <LectureSection>
            <Table>
              <TableHead />
              <tbody>
                <TableRow>
                  <TableData flex={0.2}></TableData>
                  <TableData>
                    <button>수정</button>
                  </TableData>
                  <TableData>강의 번호</TableData>
                  <TableData>분반</TableData>
                  <TableData flex={1}>강의명</TableData>
                  <TableData>학년</TableData>
                  <TableData>정원</TableData>
                  <TableData>수강 인원</TableData>
                  <TableData>교수명</TableData>
                  <TableData>학점</TableData>
                  <TableData flex={1}>강의실</TableData>
                  <TableData flex={1.2}>강의 시간</TableData>
                  <TableData>이수 구분</TableData>
                  <TableData>주/야 구분</TableData>
                  <TableData>
                    <button>강의 계획서</button>
                  </TableData>
                </TableRow>
              </tbody>
            </Table>
          </LectureSection>
        </Main>
      </Container>
    </ThemeProvider>
  );
};

export default ManagementPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100vw;

  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.bgColor};
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;

  width: 91%;

  padding: 20px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  padding-top: 20px;
  padding-bottom: 20px;
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 100%;
  padding-bottom: 10px;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 900;
`;

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  border: 1px solid #a9a9a9;

  padding: 12px;
  gap: 10px;
`;

const Line = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const LectureSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  max-height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
`;

const Table = styled.table`
  width: 100%;
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

  flex: ${(props) => props.flex || 0.6};

  padding: 0.8rem 0.3rem;
  text-align: center;

  background-color: ${({ theme }) => theme.bgColor};
  border-bottom: 1px solid #a39485;
`;

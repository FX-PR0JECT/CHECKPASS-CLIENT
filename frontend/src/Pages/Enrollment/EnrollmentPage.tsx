import styled from 'styled-components';
import axios, { AxiosError } from 'axios';
import { colors, fontSizes } from '../../Styles/theme';
import { useState, useEffect } from 'react';

interface TableDataProps {
  flex?: number;
}

type Lecture = {
  lectureCode: string;
  division: string;
  lectureName: string;
  lectureGrade: string;
  lectureFull: string;
  lectureCount: string;
  professorName: string;
  lectureGrades: string;
  lectureRoom: string;
  alphaTimeCodes: Array<String>;
  lectureKind: string;
  dayOrNight: string;
};

const EnrollmentPage = () => {
  const [lectures, setLectures] = useState<Lecture[]>([]);

  const lectureList = async () => {
    try {
      const response = await axios.get('http://localhost:8080/lectures/search');
      const resultSet = response.data.resultSet;

      return resultSet;
    } catch (error: any) {
      throw error;
    }
  };

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const result = await lectureList();

        if (Array.isArray(result)) {
          setLectures(result);
        }
      } catch (error: any) {
        console.error(error.response.data.resultSet);
      }
    };
    fetchLectures();
  }, []);

  return (
    <Container>
      <Header>
        <Logo>CHECK PASS</Logo>
        <LogoutButton>로그아웃</LogoutButton>
      </Header>
      <Main>
        <Section>
          <TextContent>
            <Title>개설 강의 목록</Title>
          </TextContent>
          <SearchContainer></SearchContainer>
        </Section>
        <Section>
          <LectureList>
            <TableHead>
              <TableRow>
                <TableHeader flex={0.2}></TableHeader>
                <TableHeader>수강 신청</TableHeader>
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
            </TableHead>
            <tbody>
              {lectures.length > 0 ? (
                lectures.map((lecture, index) => (
                  <TableRow key={index}>
                    <TableData flex={0.2}>{index + 1}</TableData>
                    <TableData>
                      <button>신청</button>
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
          </LectureList>
        </Section>
        <Section>
          <TextContent>
            <Title>
              <span>수강 신청 내역 </span>
            </Title>
            <Detalis>
              <span>총 신청 가능 학점 20 | </span>
              <span>신청 강의 수 1 | </span>
              <span>신청 학점 3</span>
            </Detalis>
          </TextContent>
          <RegisterList>
            <TableHead>
              <TableRow>
                <TableHeader flex={0.2}></TableHeader>
                <TableHeader>수강 신청</TableHeader>
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
            </TableHead>
            <tbody>
              <TableRow>
                <TableData flex={0.2}>1</TableData>
                <TableData>
                  <button>삭제</button>
                </TableData>
                <TableData>0123456</TableData>
                <TableHeader>1</TableHeader>
                <TableData flex={1}>웹 프로그래밍</TableData>
                <TableData>2</TableData>
                <TableData>30</TableData>
                <TableData>18</TableData>
                <TableData>이광</TableData>
                <TableData>3</TableData>
                <TableData flex={1}>미래융합정보관(225)</TableData>
                <TableData flex={1.2}>화(1A,1B,2A,2B)</TableData>
                <TableData>전선</TableData>
                <TableData>주간</TableData>
                <TableData>
                  <button>강의 계획서</button>
                </TableData>
              </TableRow>
            </tbody>
          </RegisterList>
        </Section>
      </Main>
    </Container>
  );
};

export default EnrollmentPage;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 70px;
  padding: 35px;

  border-bottom: 1.5px solid ${colors['border-default']};
`;

const Logo = styled.div`
  font-family: 'AppleTea';
  font-size: ${fontSizes['header-logo']};

  color: ${colors['text-primary']};
`;

const LogoutButton = styled.button`
  padding: 5px;

  border: 1px solid #4f4f4f;
  border-radius: 10px;

  cursor: pointer;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;

  padding: 20px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  padding-bottom: 20px;
`;

const SearchContainer = styled.div`
  width: 98%;
  height: 120px;

  border: 1px solid #000;
`;

const LectureList = styled.table`
  width: 98%;
  height: 500px;

  overflow: auto;
  font-size: 0.9em;

  border: 1px solid #a39485;
  border-collapse: collapse;
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 98%;
  padding-bottom: 10px;
`;

const Detalis = styled.div``;

const Title = styled.div`
  font-size: 18px;
  font-weight: 900;
`;

const RegisterList = styled.table`
  width: 98%;

  overflow: hidden;
  font-size: 0.9em;

  border: 1px solid #a39485;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background: #edf3ff;
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

const TableHeader = styled.th<TableDataProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  flex: ${(props) => props.flex || 0.4};

  padding: 0.8rem 0.3rem;
  border-bottom: 1px solid #a39485;
`;

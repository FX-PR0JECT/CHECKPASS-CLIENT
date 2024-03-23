import styled, { ThemeProvider } from 'styled-components';
import { MainTheme, colors, fontSizes } from '@/src/Styles/theme';
import { useState, useEffect, useRef } from 'react';
import { ProfessorLectures, ProfessorLecture } from '@/src/types';
import useTheme from '@/src/Hooks/useTheme';
import Header from '@/src/components/Header';
import groupLectures from '@/src/utils/groupLectureUtils';
import axios from 'axios';
import useSelect from '@/src/Hooks/useSelect';
import Select from '@/src/components/Select';

type Student = {
  attendanceStatus: string;
  studentId: number;
  studentName: string;
};

const AttendancePage = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [professorLectures, setProfessorLectures] = useState<ProfessorLectures[]>([]);
  const [selectedLecture, setSelectedLecture] = useState<ProfessorLecture | null>(null);

  const [students, setStudentss] = useState<Student[]>();

  const {
    selects: { lectureName, division, week },
    setSelects,
    onSelectChange,
  } = useSelect({
    lectureName: '',
    division: '',
    week: '',
  });

  const groupedLectures = groupLectures(professorLectures);

  const weeks = Array.from({ length: 16 }, (_, index) => index + 1);

  // 해당 학기에 교수가 개설한 강의 조회
  useEffect(() => {
    axios
      .get('http://localhost:8080/lectures/offerings')
      .then((response) => {
        const lectures = response.data.resultSet;
        setProfessorLectures(lectures);
      })
      .catch((error) => {
        console.error(`강의 목록을 확인할 수 없습니다. ${error}`);
      });
  }, []);

  // 개설 강의 선택 시 자동으로 해당 강의의 분반 표시
  const handleLectureChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectChange(e);
    const { value } = e.target;
    const lecture = groupedLectures.find((lecture) => lecture.lectureName === value);

    if (lecture) {
      const newLecture: ProfessorLecture = {
        lectureCode: lecture.lectureName,
        lecturesByCode: lecture.lecturesByCode,
      };

      setSelectedLecture(newLecture);
    }
  };

  const handleWeek = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (value !== '--주차 선택--') {
      setSelects((prev) => ({ ...prev, week: value }));
    }
  };

  // 주차 선택 시 학생 출석 정보 업데이트
  useEffect(() => {
    if (selectedLecture && week && division) {
      const getWeek = week.slice(0, 1);
      const lectureCode = division;

      axios
        .get(`http://localhost:8080/attendance/info/${getWeek}/${lectureCode}`)
        .then((response) => {
          const rawStudents: Student[] = response.data.resultSet;

          setStudentss(rawStudents);
        })
        .catch((error) => console.error(`수강 중인 학생 리스트를 조회할 수 없습니다. ${error}`));
    }
  }, [selectedLecture, week, division]);

  const AttendRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const handleAttendScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    if (AttendRef.current) {
      AttendRef.current.scrollTop += e.deltaY;
    }
  };

  return (
    <ThemeProvider theme={isDarkMode ? MainTheme.dark : MainTheme.light}>
      <Page>
        <Header mode={isDarkMode} themeHandler={toggleTheme} />
        <Main onWheelCapture={handleAttendScroll}>
          <LeftContainer>
            <SelectContainer>
              <Select value={lectureName} name="lectureName" onChange={handleLectureChange}>
                <option>--강의 선택--</option>
                {groupedLectures.map((lecture) => (
                  <option key={lecture.lectureName} value={lecture.lectureName}>
                    {lecture.lectureName}
                  </option>
                ))}
              </Select>
              {selectedLecture && (
                <>
                  <Select
                    value={division}
                    name="division"
                    onChange={onSelectChange}
                    selectSize="sm"
                  >
                    <option>--분반 선택--</option>
                    {selectedLecture.lecturesByCode.map(({ lectureCode, divisions }) =>
                      divisions.map((division, index) => (
                        <option key={index} value={lectureCode}>
                          {division} ({lectureCode})
                        </option>
                      ))
                    )}
                  </Select>
                  <Select onChange={handleWeek} name="week" value={week} selectSize="sm">
                    <option>--주차 선택--</option>
                    {weeks.map((week) => (
                      <option key={week} value={week}>
                        {week}주차
                      </option>
                    ))}
                  </Select>
                </>
              )}
            </SelectContainer>
            <AttendContainer ref={AttendRef}>
              {students?.map((student) => (
                <AttendItem key={student.studentId}>{student.studentName}</AttendItem>
              ))}
            </AttendContainer>
          </LeftContainer>
          <RightContainer>
            <StudentBox>정원: {students?.length ?? 0}명</StudentBox>
            <StudentBox>출석 인원: 0명</StudentBox>
            <CodeButton>코드 생성기</CodeButton>
          </RightContainer>
        </Main>
      </Page>
    </ThemeProvider>
  );
};

export default AttendancePage;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.bgColor};
`;

const Main = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  height: calc(100vh - 70px);

  padding: 0 3px;
  gap: 50px;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 90;

  padding: 15px 0 10px 0;
  gap: 20px;
`;

const SelectContainer = styled.div`
  display: flex;
  padding: 0 3px;
  gap: 20px;
`;

const AttendContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;

  width: 100%;
  height: 580px;

  padding: 3px;
  gap: 30px;

  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0;
  }
`;

const AttendItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 110px;
  height: 110px;

  background: linear-gradient(${colors['attendance-item-g1']}, ${colors['attendance-item-g2']});
  box-shadow: 0px 0px 4px ${colors['shadow-default']};
  border-radius: 27px;

  font-size: ${fontSizes.large};
  font-family: 'AppleGothicR';

  cursor: pointer;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 10;

  padding: 15px 0;
  gap: 15px;
`;

const StudentBox = styled.div`
  display: flex;
  justify-content: center;
  width: 150px;
  padding: 10px;

  background: linear-gradient(${colors['attendance-item-g1']}, ${colors['attendance-item-g2']});
  box-shadow: 0px 0px 4px ${colors['shadow-default']};
  border-radius: 10px;

  font-size: ${fontSizes.medium};
  font-family: 'AppleGothicR';
`;

const CodeButton = styled.button`
  width: 150px;
  padding: 10px;

  background-color: ${colors.button};
  border-radius: 20px;
  border: none;

  color: ${colors['button-text']};
  font-size: ${fontSizes.medium};
  font-family: 'AppleGothicR';

  cursor: pointer;
`;

import styled, { ThemeProvider } from 'styled-components';
import { MainTheme, colors, fontSizes } from '@/src/Styles/theme';
import { useRef } from 'react';
import useTheme from '@/src/Hooks/useTheme';
import Header from '@/src/components/Header';
import Button from '@/src/components/Button';
import Select from '@/src/components/Select';

const AttendancePage = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  const AttendRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const students: JSX.Element[] = Array.from({ length: 50 }, (_, idx) => (
    <AttendItem key={idx}>학생 {idx + 1}</AttendItem>
  ));

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
              <Select variant="page" selectSize="lg">
                <option>캡스톤디자인 I</option>
                <option>컴퓨터 네트워크</option>
                <option>데이터베이스 시스템</option>
                <option>웹 프레임워크</option>
                <option>모바일 프로그래밍</option>
                <option>기계학습</option>
                <option>인공지능</option>
              </Select>
              <Select variant="page" selectSize="sm">
                <option>1분반</option>
                <option>2분반</option>
              </Select>
            </SelectContainer>
            <AttendContainer ref={AttendRef}>{students}</AttendContainer>
          </LeftContainer>
          <RightContainer>
            <StudentBox>정원: 40명</StudentBox>
            <StudentBox>출석 인원: 0명</StudentBox>
            <Button>코드 생성기</Button>
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
  flex: 10;
  display: grid;
  grid-template-columns: 150px;
  grid-template-rows: repeat(3, 40px);
  justify-content: center;

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

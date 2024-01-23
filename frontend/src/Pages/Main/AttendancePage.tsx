import styled from 'styled-components';
import { fontSizes, colors } from '../../Styles/theme';
import MoonIcon from '../../Assets/Image/moon.png';
import { useState, useRef } from 'react';

const AttendancePage = () => {
  const [view, setView] = useState<boolean>(false);
  const AttendRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const students: JSX.Element[] = Array.from({ length: 50 }, (_, idx) => (
    <AttendItem key={idx}>학생 {idx + 1}</AttendItem>
  ));

  const handleProfileClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setView(!view);
  };

  const handleOutsideClick = () => {
    setView(false);
  };

  const handleAttendScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    if (AttendRef.current) {
      AttendRef.current.scrollTop += e.deltaY;
    }
  };

  return (
    <Page onClick={handleOutsideClick}>
      <Header>
        <Logo>CHECKPASS</Logo>
        <IconBox>
          <ThemeIcon src={MoonIcon} alt="moon icon" />
          <Profile onClick={handleProfileClick}></Profile>
          {view && (
            <Menu>
              <ProfileList>내 정보</ProfileList>
              <ProfileList>로그아웃</ProfileList>
            </Menu>
          )}
        </IconBox>
      </Header>
      <Main onWheelCapture={handleAttendScroll}>
        <LeftContainer>
          <SelectContainer>
            <Select>
              <option>캡스톤디자인 I</option>
              <option>컴퓨터 네트워크</option>
              <option>데이터베이스 시스템</option>
              <option>웹 프레임워크</option>
              <option>모바일 프로그래밍</option>
              <option>기계학습</option>
              <option>인공지능</option>
            </Select>
            <Select class>
              <option>1분반</option>
              <option>2분반</option>
            </Select>
          </SelectContainer>
          <AttendContainer ref={AttendRef}>{students}</AttendContainer>
        </LeftContainer>
        <RightContainer>
          <StudentBox>정원: 40명</StudentBox>
          <StudentBox>출석 인원: 0명</StudentBox>
          <CodeButton>코드 생성기</CodeButton>
        </RightContainer>
      </Main>
    </Page>
  );
};

export default AttendancePage;

interface SelectProps {
  class?: boolean;
  children: React.ReactNode;
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  background-color: ${colors.white};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  width: 90%;
  height: 70px;

  padding: 0 10px;

  border-bottom: 1.5px solid ${colors['border-default']};
`;

const Logo = styled.div`
  font-size: ${fontSizes['header-logo']};
  font-family: 'AppleTea';
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ThemeIcon = styled.img`
  width: 44px;
  height: 44px;

  padding: 8px;

  cursor: pointer;

  &:hover {
    border-radius: 100%;
    background-color: ${colors.bubble};
  }
`;

const Profile = styled.button`
  width: 40px;
  height: 40px;

  background-color: transparent;
  border: 1px solid ${colors['border-dark']};
  border-radius: 100%;

  cursor: pointer;
`;

const Menu = styled.ul`
  width: 100px;
  list-style: none;

  position: absolute;
  top: 100%;

  background-color: ${colors.white};
  border-radius: 8px;
  box-shadow: 0 1px 8px ${colors['shadow-dark']};

  @keyframes dropdown {
    0% {
      transform: translateY(-10%);
    }
    100% {
      transform: translateY(0%);
    }
  }
  animation: dropdown 0.4s ease;
`;

const ProfileList = styled.li`
  display: block;
  padding: 15px 20px;
  border-bottom: 1px solid ${colors['border-default']};

  cursor: pointer;
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

const Select = styled.select<SelectProps>`
  width: ${(props) => (props.class ? '100px' : '220px')};
  padding: 3px;

  border: none;
  border-radius: 6px;
  box-shadow: 0px 0px 5px ${colors['shadow-default']};
  outline: none;

  font-size: ${fontSizes.medium};
  font-family: 'AppleGothicR';
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

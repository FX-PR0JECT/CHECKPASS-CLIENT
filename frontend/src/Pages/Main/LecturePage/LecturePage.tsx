import styled from 'styled-components';
import { fontSizes, colors } from '../../../Styles/theme';
import MoonIcon from '../../../Assets/Image/moon.png';
import SearchIcon from '../../../Assets/Image/LecturePage/search_light.png';
import { useState } from 'react';

import LectureCard from './LectureCard';
import TimeTable from './TimeTable';

const LecturePage = () => {
  const [view, setView] = useState<boolean>(false);

  const handleProfileClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setView(!view);
  };

  const handleOutsideClick = () => {
    setView(false);
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
      <Main>
        <LeftContainer>
          <Select>
            <option>2024년 1학기</option>
            <option>2024년 2학기</option>
          </Select>
          <SearchContainer>
            <LectureTitle>과목명으로 찾기</LectureTitle>
            <SearchBox>
              <SearchInput type="text" placeholder="과목명을 입력하세요" />
              <SearchButton />
            </SearchBox>
            <LectureContainer>
              <LectureCard />
            </LectureContainer>
          </SearchContainer>
        </LeftContainer>
        <RightContainer>
          <TimeTable />
        </RightContainer>
      </Main>
    </Page>
  );
};

export default LecturePage;

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
  justify-content: space-between;
  width: 90%;
  height: calc(100vh - 70px);

  padding: 15px 5px;
  gap: 30px;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  gap: 15px;
`;

const Select = styled.select`
  width: 200px;
  padding: 5px;

  border: none;
  border-radius: 6px;
  box-shadow: 0px 0px 5px ${colors['shadow-default']};
  outline: none;

  font-size: ${fontSizes.medium};
  font-family: 'AppleGothicR';
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 580px;

  padding: 20px;
  gap: 10px;

  border-radius: 25px;
  border: 1px solid ${colors['border-default']};
  box-shadow: 0px 0px 5px ${colors['shadow-dark']};
`;

const LectureTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 135px;
  padding: 7px;

  border-radius: 16px;
  background-color: ${colors.bubble};

  font-size: ${fontSizes.medium};
  font-family: 'AppleGothicR';
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 7px 5px;

  border-bottom: 1.5px solid ${colors['border-default']};
  border-width: 0 0 1px;
  outline: none;

  font-size: ${fontSizes.large};
  font-family: 'AppleGothicR';
`;

const SearchButton = styled.button`
  width: 35px;
  height: 35px;
  padding: 5px;

  background: url(${SearchIcon}) no-repeat;
  background-size: contain;

  border: none;
  cursor: pointer;
`;

const LectureContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  padding: 10px;
  gap: 13px;

  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0;
  }
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

import styled, { ThemeProvider } from 'styled-components';
import { icons } from '@/common/icons';
import { MainTheme, colors, fontSizes } from '@/src/Styles/theme';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { LectureInfo } from '@/src/types';
import useTheme from '@/src/Hooks/useTheme';
import Header from '@/src/components/Header';
import LectureCards from './LectureCard';
import TimeTable from './TimeTable';
import Input from '@/src/components/Input';
import Select from '@/src/components/Select';

const LecturePage = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  const [lectures, setLectures] = useState<LectureInfo[]>([]);
  const [filteredLectures, setFilteredLectures] = useState<LectureInfo[]>([]);
  const [searchLecture, setSearchLecture] = useState<string>('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchLecture(e.target.value);
  };

  const filterLectures = () => {
    const filtered = lectures.filter((item: LectureInfo) =>
      item.lectureName.includes(searchLecture)
    );
    setFilteredLectures(searchLecture === '' ? lectures : filtered);
  };

  const handleSearchButtonClick = () => {
    filterLectures();
  };

  const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchButtonClick();
    }
  };

  const getEnrollmentHistory = async () => {
    try {
      const response = await axios.get('http://localhost:8080/enrollment/history');
      const lecture = response.data.resultSet['2024년도 1학기'];

      setLectures(lecture);
      setFilteredLectures(lecture);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const auth = async () => {
      try {
        await getEnrollmentHistory();
      } catch (error) {
        console.error(error);
      }
    };
    auth();
  }, []);

  return (
    <ThemeProvider theme={isDarkMode ? MainTheme.dark : MainTheme.light}>
      <Page>
        <Header mode={isDarkMode} themeHandler={toggleTheme} />
        <Main>
          <LeftContainer>
            <Select variant="page" selectSize="md">
              <option>2024년 1학기</option>
              <option>2024년 2학기</option>
            </Select>
            <SearchContainer>
              <LectureTitle>과목명으로 찾기</LectureTitle>
              <SearchBox>
                <Input
                  type="text"
                  placeholder="과목명을 입력하세요"
                  value={searchLecture}
                  onChange={handleSearchChange}
                  onKeyDown={handleEnterKeyPress}
                  variant="search"
                  fontSize="lg"
                />
                <SearchButton
                  src={isDarkMode ? icons.LecturePage.searchDark : icons.LecturePage.searchLight}
                  onClick={handleSearchButtonClick}
                  alt="SearchImage"
                />
              </SearchBox>
              <LectureCards lecture={filteredLectures} />
            </SearchContainer>
          </LeftContainer>
          <RightContainer>
            <TimeTable lecture={lectures} />
          </RightContainer>
        </Main>
      </Page>
    </ThemeProvider>
  );
};

export default LecturePage;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100vw;
  height: 100vh;

  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.bgColor};
`;

const Main = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;

  padding: 15px 5px;
  gap: 30px;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  gap: 15px;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 578px;

  padding: 20px;
  gap: 10px;

  border-radius: 25px;
  border: 1px solid ${colors['border-default']};
  box-shadow: 0px 0px 5px ${colors['shadow-default']};
`;

const LectureTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 135px;
  padding: 7px;

  border-radius: 16px;
  background-color: ${colors.bubble};

  color: ${colors['text-primary']};
  font-size: ${fontSizes.medium};
  font-family: 'AppleGothicR';
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SearchButton = styled.img`
  width: 30px;
  height: 30px;

  cursor: pointer;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

import styled, { ThemeProvider } from 'styled-components';
import { MainTheme, fontSizes, colors } from '../../../Styles/theme';
import Header from '../../../components/Header';
import useTheme from '../../../Hooks/useTheme';
import { useState, useEffect } from 'react';
import axios from 'axios';

import LectureCards from './LectureCard';
import TimeTable from './TimeTable';
import { LectureInfo } from '../../../types';
import { IMAGE } from '../../../constants/image';

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
            <Select>
              <option>2024년 1학기</option>
              <option>2024년 2학기</option>
            </Select>
            <SearchContainer>
              <LectureTitle>과목명으로 찾기</LectureTitle>
              <SearchBox>
                <SearchInput
                  type="text"
                  placeholder="과목명을 입력하세요"
                  value={searchLecture}
                  onChange={handleSearchChange}
                  onKeyDown={handleEnterKeyPress}
                />
                <SearchButton
                  src={isDarkMode ? IMAGE.DarkSearchImage : IMAGE.LightSearchImage}
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
  justify-content: center;
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

const SearchInput = styled.input`
  width: 100%;
  padding: 7px 5px;

  border-bottom: 1.5px solid ${colors['border-default']};
  border-width: 0 0 1px;
  outline: none;

  color: ${({ theme }) => theme.color};
  font-size: ${fontSizes.large};
  font-family: 'AppleGothicR';

  background-color: transparent;
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

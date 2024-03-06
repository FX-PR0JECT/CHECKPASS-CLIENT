import styled, { ThemeProvider } from 'styled-components';
import { MainTheme, fontSizes, colors } from '../../../Styles/theme';
import SearchIcon from '../../../Assets/Image/LecturePage/search_light.png';
import Header from '../../../components/Header';
import useTheme from '../../../Hooks/useTheme';
import LectureCard from './LectureCard';
import TimeTable from './TimeTable';

const LecturePage = () => {
  const { isDarkMode, toggleTheme } = useTheme();

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

  background-color: transparent;
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

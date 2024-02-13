import styled, { ThemeProvider } from 'styled-components';
import { MainTheme, colors, fontSizes } from '../../Styles/theme';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IMAGE } from '../../constants/image';

const MainPage = () => {
  const localTheme = localStorage.getItem('theme');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(localTheme === 'dark' ? true : false);

  const navigate = useNavigate();
  const [view, setView] = useState<Boolean>(false);
  const [name, setName] = useState('');

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const nextTheme = !prev;
      localStorage.setItem('theme', nextTheme ? 'dark' : 'light');
      return nextTheme;
    });
  };

  const handleProfileClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setView(!view);
  };

  const handleOutsideClick = () => {
    setView(false);
  };

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    async function auth() {
      axios
        .get('http://localhost:8080/users')
        .then(({ data }) => setName(data.resultSet.userName))
        .catch((error) => {
          navigate('/signIn');
          console.log(error);
        });
    }
    auth();
  }, []);

  return (
    <ThemeProvider theme={isDarkMode ? MainTheme.dark : MainTheme.light}>
      <Container>
        <Header>
          <Logo>CHECKPASS</Logo>
          <RightWrapper>
            {isDarkMode ? (
              <ThemeButton
                src={IMAGE.DarkThemeIcon}
                alt="ThemeIcon"
                onClick={toggleTheme}
              ></ThemeButton>
            ) : (
              <ThemeButton
                src={IMAGE.LightThemeIcon}
                alt="ThemeIcon"
                onClick={toggleTheme}
              ></ThemeButton>
            )}
            <Dropdown>
              <Profile onClick={handleProfileClick}></Profile>
              {view && (
                <Menu>
                  <ProfileList>내 정보</ProfileList>
                  <ProfileList>로그아웃</ProfileList>
                </Menu>
              )}
            </Dropdown>
          </RightWrapper>
        </Header>
        <Main>
          <Greeting>
            <GreetingIcon src={IMAGE.CheckIcon} alt="CheckIcon" />
            <GreetingMessage>
              {name} 님 안녕하세요! <br /> 어떤 서비스를 도와드릴까요?
            </GreetingMessage>
          </Greeting>
          <Wrapper>
            <BeaconCard>
              <BubbleBox>
                <CardIcon src={IMAGE.BeaconIcon} alt="BeaconIcon" />
                <Bubble>메인 서비스</Bubble>
              </BubbleBox>
              <CardTitle $font_size={2}>비콘으로 출석하기</CardTitle>
              <HashTag>#빠르고편리한출결 #bluetooth #beacon</HashTag>
              {isDarkMode ? (
                <BeaconImage src={IMAGE.DarkBeaconImage} alt="BecaconImage" />
              ) : (
                <BeaconImage src={IMAGE.LightBeaconImage} alt="BecaconImage" />
              )}
            </BeaconCard>
            <Cards>
              <Card>
                <BubbleBox>
                  <CardIcon src={IMAGE.AttendanceIcon} alt="AttendanceIcon" />
                  <Bubble>비콘이 이상하다면?</Bubble>
                </BubbleBox>
                <CardContent>
                  <CardTitle>전자출결로 출결하기</CardTitle>
                  <HashTag>#랜덤코드 #전자출결</HashTag>
                </CardContent>
              </Card>
              <Card>
                <BubbleBox>
                  <CardIcon src={IMAGE.CalendarIcon} alt="CalendarIcon" />
                  <Bubble>내 시간표</Bubble>
                </BubbleBox>
                <CardContent>
                  <CardTitle>시간표 확인하기</CardTitle>
                  <HashTag>#학기시간표 #강의확인</HashTag>
                </CardContent>
              </Card>
              <Card>
                <BubbleBox>
                  <CardIcon src={IMAGE.CommunityIcon} alt="CommunityIcon" />
                  <Bubble>수강생 의견</Bubble>
                </BubbleBox>
                <CardContent>
                  <CardTitle>자유롭게 소통하기</CardTitle>
                  <HashTag>#의견 #소통 #정보공유</HashTag>
                </CardContent>
              </Card>
              <Card>
                <BubbleBox>
                  <CardIcon src={IMAGE.NoticeIcon} alt="NoticeIcon" />
                  <Bubble>과제가 궁금하다면?</Bubble>
                </BubbleBox>
                <CardContent>
                  <CardTitle>공지 확인하기</CardTitle>
                  <HashTag>#일정 #과제 #공지</HashTag>
                </CardContent>
              </Card>
            </Cards>
          </Wrapper>
        </Main>
      </Container>
    </ThemeProvider>
  );
};

export default MainPage;

export type CardTitleStyleProps = { $font_size?: number };

const Container = styled.div`
  /* width: 100%;
  max-width: 1468px;
  min-width: 1468px; */
  position: fixed;
  width: 100vw;
  height: 100vh;

  margin: auto;
  padding: 0 70px;

  font-family: 'AppleGothicL';
  color: ${({ theme }) => theme.color};

  background-color: ${({ theme }) => theme.bgColor};
`;

// Header
const Header = styled.div`
  padding: 0px 14px;
  height: 70px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1.5px solid ${colors['border-default']};
`;

const Logo = styled.div`
  font-family: 'AppleTea';
  font-size: ${fontSizes['header-logo']};
  color: ${({ theme }) => theme.color};
`;

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ThemeButton = styled.img`
  width: 44px;
  height: 44px;

  padding: 8px;

  cursor: pointer;

  &:hover {
    border-radius: 100%;
    background-color: ${({ theme }) => theme.themeHover};
  }
`;

// Dropdown
const Dropdown = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  font-family: 'AppleGothicL';
`;

const Profile = styled.img`
  width: 40px;
  height: 40px;

  border: 1px solid ${({ theme }) => theme.profileBorder};
  border-radius: 100%;

  background-color: transparent;

  cursor: pointer;
`;

const Menu = styled.ul`
  width: 100px;
  margin-top: 50px;
  list-style: none;

  position: absolute;

  background-color: ${({ theme }) => theme.itemColor};
  border-radius: 8px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);

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
  padding: 14px 20px;
  display: block;

  cursor: pointer;
  &:hover {
    color: #06c0eb;
  }
`;

// Main
const Main = styled.div`
  padding: 28px 8px;

  display: flex;
  flex-direction: column;

  gap: 32px;
`;

const Greeting = styled.div`
  display: flex;
  align-items: center;
`;

const GreetingIcon = styled.img`
  width: 108px;
  height: 82px;
`;

const GreetingMessage = styled.div`
  padding-left: 10px;
  line-height: 2.6rem;

  font-family: 'AppleGothicB';
  font-size: ${fontSizes['greeting-message']};
`;

const Wrapper = styled.div`
  display: flex;
  gap: 36px;
`;

const BeaconCard = styled.div`
  flex: 1;
  height: 514px;
  padding: 18px 20px;

  display: flex;
  flex-direction: column;

  gap: 18px;

  background-color: ${({ theme }) => theme.itemColor};
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  border-radius: 16px;

  transition: margin 0.3s;
  &:hover {
    margin-bottom: 5px;
    margin-top: -5px;
  }

  cursor: pointer;
`;

const BeaconImage = styled.img`
  width: 556px;
  height: 318px;
`;

const Cards = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;

  gap: 18px;
`;

const Card = styled.div`
  width: 300px;
  height: 246px;
  padding: 18px 20px;

  display: flex;
  flex-direction: column;

  gap: 18px;

  background-color: ${({ theme }) => theme.itemColor};
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  border-radius: 15px;

  transition: margin 0.3s;

  &:hover {
    margin-bottom: 5px;
    margin-top: -5px;
  }

  cursor: pointer;
`;

const BubbleBox = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
`;

const CardIcon = styled.img`
  width: 44px;
  height: 44px;
`;

const Bubble = styled.div`
  padding: 6px 14px;
  display: inline-block;

  position: relative;

  border-radius: 14px;
  background-color: ${({ theme }) => theme.bubble};

  font-size: ${fontSizes.small};

  &::before {
    content: '';

    width: 16px;
    height: 16px;

    position: absolute;
    top: -4px;
    left: -3px;

    background-image: url(${(props) => props.theme.bubbleTail});

    background-size: 16px;
    background-repeat: no-repeat;
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CardTitle = styled.span<CardTitleStyleProps>`
  font-family: 'AppleGothicB';
  font-size: ${({ $font_size = 1.6 }) => `${$font_size}rem`};
`;

const HashTag = styled.span`
  word-spacing: 8px;
  font-size: ${fontSizes.medium};
  color: #6d6d6d;
`;

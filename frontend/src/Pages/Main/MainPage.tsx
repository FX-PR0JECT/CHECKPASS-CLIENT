import styled, { ThemeProvider } from 'styled-components';
import { MainTheme, fontSizes } from '../../Styles/theme';
import Header from '../../components/Header';
import { IMAGE } from '../../constants/image';
import auth from '../../Hooks/auth';
import useTheme from '../../Hooks/useTheme';

const MainPage = () => {
  const { userName } = auth();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <ThemeProvider theme={isDarkMode ? MainTheme.dark : MainTheme.light}>
      <Container>
        <Header mode={isDarkMode} themeHandler={toggleTheme} />
        <Main>
          <Greeting>
            <GreetingIcon src={IMAGE.CheckIcon} alt="CheckIcon" />
            <GreetingMessage>
              {userName} 님 안녕하세요! <br /> 어떤 서비스를 도와드릴까요?
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
  flex-direction: column;

  width: 90%;

  padding: 28px 8px;
  gap: 35px;
`;

const Greeting = styled.div`
  display: flex;
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

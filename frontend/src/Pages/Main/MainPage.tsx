import styled, { ThemeProvider } from 'styled-components';
import { Link } from 'react-router-dom';
import { MainTheme, fontSizes } from '../../Styles/theme';
import Header from '../../components/Header';
import { IMAGE } from '../../constants/image';
import auth from '../../Hooks/auth';
import useTheme from '../../Hooks/useTheme';
import Card from '../../components/Card/Card';
import CARD_DATA from '../../constants/cardData';

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
            <Link to="/attendance">
              <Card
                width={'37.5rem'}
                height={'31.6rem'}
                image={IMAGE.BeaconIcon}
                description="BeaconIcon"
                content="메인 서비스"
                title="빠르고 편리하게 출석하기"
                hashtag="#빠르고편리한출결 #beacon #전자출결"
              >
                {isDarkMode ? (
                  <BeaconImage src={IMAGE.DarkBeaconImage} alt="BecaconImage" />
                ) : (
                  <BeaconImage
                    src={IMAGE.LightBeaconImage}
                    alt="BecaconImage"
                  />
                )}
              </Card>
            </Link>
            <Cards>
              {CARD_DATA.map((data, index) => (
                <Link to={data.link}>
                  <Card
                    key={index}
                    image={data.image}
                    description={data.description}
                    content={data.content}
                    title={data.title}
                    hashtag={data.hashtag}
                  />
                </Link>
              ))}
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
  height: calc(100% - 70px);

  padding: 1.75rem 0.5rem;
  gap: 2rem;
`;

const Greeting = styled.div`
  display: flex;
`;

const GreetingIcon = styled.img`
  width: 6.75rem;
  height: 5.125rem;
`;

const GreetingMessage = styled.div`
  padding-left: 0.625rem;
  line-height: 2.6rem;

  font-family: 'AppleGothicB';
  font-size: ${fontSizes['greeting-message']};
`;

const Wrapper = styled.div`
  display: flex;
  gap: 26px;
`;

const BeaconImage = styled.img`
  width: 34.75rem;
  height: 19.875rem;
`;

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;

  gap: 15px;
`;

import styled from 'styled-components';
import { fontSizes, colors } from '../../Styles/theme';
import BackGround from '../../Assets/Image/LoginPage/login_background.png';
import EnvelopeIcon from '../../Assets/Image/LoginPage/icon_envelope.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const CheckEmailPage = () => {
  const [onClicked, setOnClicked] = useState<boolean>(false);

  const handleCheckButtonClick = () => {
    setOnClicked(true);
  };

  return (
    <Page>
      <Logo>
        <Title>CheckPass</Title>
      </Logo>
      <Container>
        <Header>비밀번호 재설정</Header>
        {onClicked ? (
          <Form>
            <EnvelopeImage src={EnvelopeIcon} alt="EnvelopeIcon" />
            <TextBox>
              <CheckText>전송되었습니다.</CheckText>
              <CheckText>이메일을 확인하세요.</CheckText>
            </TextBox>
            <ButtonBox>
              <ResetButton>확인</ResetButton>
            </ButtonBox>
          </Form>
        ) : (
          <Form>
            <EnvelopeImage src={EnvelopeIcon} alt="EnvelopeIcon" />
            <TextBox>
              <CheckText>check****@a.ut.ac.kr 로</CheckText>
              <CheckText>비밀번호 재설정 이메일을 전송하시겠습니까?</CheckText>
            </TextBox>
            <ButtonBox>
              <Link to="/">
                <CancelButton>취소</CancelButton>
              </Link>
              <CheckButton onClick={handleCheckButtonClick}>확인</CheckButton>
            </ButtonBox>
          </Form>
        )}
      </Container>
    </Page>
  );
};

export default CheckEmailPage;

const Page = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${BackGround});
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
`;

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-family: 'AppleTea';
  font-size: ${fontSizes['logo-side']};
`;

const Container = styled.div`
  width: 420px;
  justify-content: center;
  align-items: center;
  border-radius: 36px;
  background-color: ${colors['form-component']};
  box-shadow: 0 2px 4px ${colors['shadow-default']}, 0 8px 16px ${colors['shadow-default']};
`;

const Header = styled.div`
  padding: 13px 0 10px 25px;
  font-size: ${fontSizes.medium};
  font-family: 'AppleGothicR';
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid ${colors['border-default']};
  padding: 10px 0;
  gap: 15px;
`;

const EnvelopeImage = styled.img`
  width: 50px;
  height: 50px;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
`;

const CheckText = styled.p`
  font-size: ${fontSizes.medium};
  font-family: 'AppleGothicR';
`;

const ButtonBox = styled.div`
  display: flex;
  padding-bottom: 5px;
  gap: 5px;
`;

const CancelButton = styled.button`
  width: 70px;
  height: 40px;
  background-color: ${colors.white};
  border-radius: 20px;
  border: none;
  font-size: ${fontSizes.medium};
  color: ${colors.button};
  font-family: 'AppleGothicR';
`;

const CheckButton = styled.button`
  width: 70px;
  height: 40px;
  background-color: ${colors.button};
  border-radius: 20px;
  border: none;
  font-size: ${fontSizes.medium};
  color: ${colors['button-text']};
  font-family: 'AppleGothicR';
`;

const ResetButton = styled.button`
  width: 70px;
  height: 40px;
  margin-left: 270px;
  background-color: ${colors.button};
  border-radius: 20px;
  border: none;
  font-size: ${fontSizes.medium};
  color: ${colors['button-text']};
  font-family: 'AppleGothicR';
`;

import styled from 'styled-components';
import { fontSizes, colors } from '../../Styles/theme';
import BackGround from '../../Assets/Image/LoginPage/login_background.png';
import EnvelopeIcon from '../../Assets/Image/LoginPage/icon_envelope.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const CheckEmailPage = () => {
  const [sendEmailClicked, setSendEmailClicked] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleConfirmClick = () => {
    setSendEmailClicked(true);
  };

  const handleCancelClick = () => {
    navigate('/');
  };

  return (
    <Page>
      <Logo>
        <Title>CheckPass</Title>
      </Logo>
      <Container>
        <Header>비밀번호 재설정</Header>
        {sendEmailClicked ? (
          <Form>
            <EnvelopeImage src={EnvelopeIcon} alt="envelope icon" />
            <TextBox>
              <CheckText>전송되었습니다.</CheckText>
              <CheckText>이메일을 확인하세요.</CheckText>
            </TextBox>
            <ButtonBox>
              <ResetButton check>확인</ResetButton>
            </ButtonBox>
          </Form>
        ) : (
          <Form>
            <EnvelopeImage src={EnvelopeIcon} alt="envelope icon" />
            <TextBox>
              <CheckText>check****@a.ut.ac.kr 로</CheckText>
              <CheckText>비밀번호 재설정 이메일을 전송하시겠습니까?</CheckText>
            </TextBox>
            <ButtonBox>
              <Button onClick={handleCancelClick}>취소</Button>
              <Button check onClick={handleConfirmClick}>
                확인
              </Button>
            </ButtonBox>
          </Form>
        )}
      </Container>
    </Page>
  );
};

export default CheckEmailPage;

interface ButtonProps {
  check?: boolean;
  children: React.ReactNode;
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  gap: 25px;

  background-image: url(${BackGround});
  background-size: cover;
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
  padding: 10px 0;

  border-top: 1px solid ${colors['border-default']};
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

const Button = styled.button<ButtonProps>`
  width: 70px;
  height: 40px;

  background-color: ${(props) => (props.check ? colors.button : colors.white)};
  border-radius: 20px;
  border: none;

  color: ${(props) => (props.check ? colors['button-text'] : colors.button)};
  font-size: ${fontSizes.medium};
  font-family: 'AppleGothicR';
`;

const ResetButton = styled(Button)`
  margin-left: 270px;
`;

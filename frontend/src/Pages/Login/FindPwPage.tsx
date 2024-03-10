import styled from 'styled-components';
import { icons } from '@/common/icons';
import { colors, fontSizes } from '@/src/Styles/theme';
import { useNavigate } from 'react-router-dom';

const FindPwPage = () => {
  const navigate = useNavigate();

  const handleConfirmClick = () => {
    navigate('/checkEmail');
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
        <Header>비밀번호 찾기</Header>
        <Form>
          <Email>
            <Input type="text" placeholder="이메일을 입력하세요" />
          </Email>
          <ButtonBox>
            <Button onClick={handleCancelClick}>취소</Button>
            <Button check onClick={handleConfirmClick}>
              확인
            </Button>
          </ButtonBox>
        </Form>
      </Container>
    </Page>
  );
};

export default FindPwPage;

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

  background-image: url(${icons.LoginPage.loginBackground});
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
  padding: 13px 0;

  border-top: 1px solid ${colors['border-default']};
  gap: 10px;
`;

const Email = styled.div`
  &::before {
    content: '';
    width: 40px;
    height: 40px;
    position: absolute;

    background-image: url(${icons.LoginPage.iconMail});
    background-size: 20px;
    background-repeat: no-repeat;
    background-position: 18px 14px;
  }
`;

const Input = styled.input`
  width: 370px;
  height: 50px;
  padding-left: 47px;

  background-color: ${colors['form-tag']};
  border: 1px solid ${colors['border-default']};
  border-radius: 20px;
  outline: none;

  font-size: ${fontSizes.small};
  font-family: 'AppleGothicR';
`;

const ButtonBox = styled.div`
  display: flex;
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

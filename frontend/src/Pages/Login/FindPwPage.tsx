import styled from 'styled-components';
import { fontSizes, colors } from '../../Styles/theme';
import BackGround from '../../Assets/Image/LoginPage/login_background.png';
import MailIcon from '../../Assets/Image/LoginPage/icon_mail.png';
import { Link } from 'react-router-dom';

const FindPwPage = () => {
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
            <Link to="/">
              <CancelButton>취소</CancelButton>
            </Link>
            <Link to="/checkEmail">
              <CheckButton>확인</CheckButton>
            </Link>
          </ButtonBox>
        </Form>
      </Container>
    </Page>
  );
};

export default FindPwPage;

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
  padding: 13px 0;
  gap: 10px;
`;

const Email = styled.div`
  &::before {
    content: '';
    width: 40px;
    height: 40px;
    position: absolute;
    background-image: url(${MailIcon});
    background-size: 20px;
    background-repeat: no-repeat;
    background-position: 18px 14px;
  }
`;

const Input = styled.input`
  width: 370px;
  height: 50px;
  padding-left: 47px;
  background-color: ${colors["form-tag"]};
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

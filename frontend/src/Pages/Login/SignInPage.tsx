// 로그인 페이지
import styled from 'styled-components';
import BackGround from '../../Assets/Image/LoginPage/login_background.png';
import UserIcon from '../../Assets/Image/LoginPage/icon_user.png';
import LockIcon from '../../Assets/Image/LoginPage/icon_lock.png';
import { Link } from 'react-router-dom';
import { colors, fontSizes } from '../../Styles/theme';

const SignInPage = () => {
  return (
    <Container>
      <Logo>
        <Title>CheckPass</Title>
        <SubTitle>우리들의 편리한 출결을 위한 서비스</SubTitle>
      </Logo>
      <SignIn>
        <Form>
          <User>
            <Input type="text" placeholder="아이디를 입력하세요" />
          </User>
          <Password>
            <Input type="password" placeholder="비밀번호를 입력하세요" />
          </Password>
          <Button>로그인</Button>
        </Form>
        <Another>
          <Link to="/signUp">
            <Span>새 계정 만들기</Span>
          </Link>
          <Span>|</Span>
          <Link to="/findPw">
            <Span>비밀번호 찾기</Span>
          </Link>
        </Another>
      </SignIn>
    </Container>
  );
};

export default SignInPage;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${BackGround});
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 120px;
`;

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

const Title = styled.div`
  font-family: 'AppleTea';
  font-size: ${fontSizes['logo-main']};
  color: ${colors['text-primary']};
`;

const SubTitle = styled.div`
  font-size: 20px;
  color: ${colors['text-primary']};
`;

const SignIn = styled.div`
  width: 450px;
  height: 304px;
  padding: 40px 38px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors['form-component']};
  border-radius: 36px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 13px;
`;

const User = styled.div`
  width: 374px;
  height: 52px;

  &::before {
    content: '';
    width: 52px;
    height: 52px;
    position: absolute;
    background-image: url(${UserIcon});
    background-size: 19px;
    background-repeat: no-repeat;
    background-position: 17px 16px;
  }
`;

const Password = styled.div`
  width: 374px;
  height: 52px;

  &::before {
    content: '';
    width: 52px;
    height: 52px;
    position: absolute;
    background-image: url(${LockIcon});
    background-size: 16px 20px;
    background-repeat: no-repeat;
    background-position: 18px 15px;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  padding-left: 46px;
  background-color: ${colors['form-tag']};
  border: 1px solid #dddfe2;
  border-radius: 20px;
  font-size: 16px;
  outline: none;

  &::placeholder {
    font-size: ${fontSizes.medium};
  }
`;

const Button = styled.button`
  width: 374px;
  height: 55px;
  border-radius: 20px;
  background-color: ${colors.button};
  border: none;
  color: ${colors['button-text']};
  font-size: ${fontSizes['button-pw']};
  cursor: pointer;
`;

const Another = styled.div`
  display: flex;
  gap: 10px;
`;

const Span = styled.span`
  font-size: 16px;
  color: ${colors['text-tertiary']};
`;

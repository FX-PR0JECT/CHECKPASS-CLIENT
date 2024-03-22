import styled from 'styled-components';
import { icons } from '@/common/icons';
import { colors, fontSizes } from '@/src/Styles/theme';
import { useNavigate } from 'react-router-dom';
import Button from '@/src/components/Button';
import Input from '@/src/components/Input';
import { useState } from 'react';
import useInput from '@/src/Hooks/useInput';
import Error from '@/src/components/Error';

type InputType = {
  email: string;
};

const FindPwPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const { inputs, onInputChange } = useInput<InputType>({
    email: '',
  });

  const { email } = inputs;

  const handleConfirmClick = () => {
    if (email === '') {
      setError('필수 정보입니다.');
      return;
    }

    // 이메일 조건 추가해야 해요 !

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
          <Input
            isError={!!error}
            placeholder="이메일을 입력하세요"
            name="email"
            value={email}
            onChange={onInputChange}
            icon={{ url: icons.LoginPage.iconMail, size: 20, position: [18, 15] }}
          />
          {error && <Error>{error}</Error>}
          <ButtonBox>
            <Button variant="secondary" onClick={handleCancelClick}>
              취소
            </Button>
            <Button onClick={handleConfirmClick}>확인</Button>
          </ButtonBox>
        </Form>
      </Container>
    </Page>
  );
};

export default FindPwPage;

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
  padding: 13px 25px;

  border-top: 1px solid ${colors['border-default']};
  gap: 10px;
`;

const ButtonBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 70px);
  height: 40px;
  gap: 5px;
`;

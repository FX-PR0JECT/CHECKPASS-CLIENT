import styled from 'styled-components';
import { icons } from '@/common/icons';
import { colors, fontSizes } from '@/src/Styles/theme';
import { Link, useNavigate } from 'react-router-dom';
import { FormEvent } from 'react';
import axios from 'axios';

import useInput from '@/src/Hooks/useInput';
import useError from '@/src/Hooks/useError';
import { isExistError, isIdValidError } from './function';
import Button from '@/src/components/Button';
import Input from '@/src/components/Input';

type InputType = {
  id: string;
  pw: string;
};

const SignInPage = () => {
  const navigate = useNavigate();

  const { inputs, onInputChange } = useInput<InputType>({
    id: '',
    pw: '',
  });

  const { error, onChangeError } = useError({
    message: '',
    type: '',
  });

  const { id, pw } = inputs;

  // DB ID 확인
  const isIdValid = async (id: string) => {
    let sameId = '';
    try {
      const { data } = await axios.get(`http://localhost:8080/users/duplication/${id}`);
      sameId = data.state;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        sameId = error?.response?.data.state;
      }
    }

    return sameId;
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 아이디나 비밀번호 입력이 없는 경우 에러 메시지 출력 후 종료
    if (isExistError(id, pw)) {
      onChangeError(isExistError(id, pw));
      return;
    }

    const idValid = await isIdValid(id);

    // DB에 존재하지 않는 id 일 경우 에러 메시지 출력 후 종료
    if (isIdValidError(idValid)) {
      onChangeError(isIdValidError(idValid));
      return;
    }

    const userInfo = {
      loginId: id,
      loginPassword: pw,
    };

    await axios
      .post('http://localhost:8080/login', userInfo)
      .then((response) => {
        if (response.status === 200) {
          navigate('/');
          console.log(response);
        }
      })
      .catch((error) => {
        onChangeError({
          message: '아이디 또는 비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해주세요.',
          type: 'pw',
        });

        console.log(error);
      });
  };

  return (
    <Container>
      <Logo>
        <Title>CheckPass</Title>
        <SubTitle>우리들의 편리한 출결을 위한 서비스</SubTitle>
      </Logo>
      <Form onSubmit={onSubmit}>
        <FormSection>
          <Input
            isError={error?.type === 'id'}
            placeholder="아이디를 입력하세요"
            name="id"
            value={id}
            onChange={onInputChange}
            fontSize="md"
            startIcon={{ url: icons.LoginPage.iconUser, size: 20, position: [19, 15] }}
          />
          <Input
            isError={error?.type === 'pw'}
            type="password"
            placeholder="비밀번호를 입력하세요"
            name="pw"
            value={pw}
            onChange={onInputChange}
            autoComplete="off"
            fontSize="md"
            startIcon={{ url: icons.LoginPage.iconLock, size: 17, position: [20, 14] }}
          />
          {error?.message && <ErrorMessage>{error?.message}</ErrorMessage>}
          <ButtonWrapper>
            <Button size="lg">로그인</Button>
          </ButtonWrapper>
          <Another>
            <Link to="/signUp/selectJob">
              <Span>새 계정 만들기</Span>
            </Link>
            <Span>|</Span>
            <Link to="/findPw">
              <Span>비밀번호 찾기</Span>
            </Link>
          </Another>
        </FormSection>
      </Form>
    </Container>
  );
};

export default SignInPage;

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  background-image: url(${icons.LoginPage.loginBackground});
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

const Form = styled.form`
  width: 450px;

  padding: 40px 38px;

  background-color: ${colors['form-component']};
  border-radius: 36px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 13px;
`;

const ButtonWrapper = styled.div`
  width: 374px;
  height: 55px;
`;

const Another = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Span = styled.span`
  font-family: 'AppleGothicR';
  font-size: 16px;
  color: ${colors['text-tertiary']};
`;

const ErrorMessage = styled.div`
  width: 100%;
  font-size: 12px;
  color: ${colors['text-error']};

  white-space: pre-wrap;
`;

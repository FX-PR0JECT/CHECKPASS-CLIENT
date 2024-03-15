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

type InputType = {
  id: string;
  pw: string;
};

type InputProps = {
  isError: boolean;
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
          <FormItem>
            <Input
              isError={error?.type === 'id'}
              type="text"
              autoComplete="current-id"
              placeholder="아이디를 입력하세요"
              name="id"
              value={id}
              onChange={onInputChange}
            />
          </FormItem>
          <FormItem imageURL={icons.LoginPage.iconLock} imageSize="17px" imagePosition="20px 14px">
            <Input
              isError={error?.type === 'pw'}
              type="password"
              autoComplete="current-password"
              placeholder="비밀번호를 입력하세요"
              name="pw"
              value={pw}
              onChange={onInputChange}
            />
            {error?.message && <ErrorMessage>{error?.message}</ErrorMessage>}
          </FormItem>
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

interface ImageProps {
  imageURL?: string;
  imageSize?: string;
  imagePosition?: string;
}

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

const FormItem = styled.div<ImageProps>`
  &::before {
    width: 40px;
    height: 40px;

    position: absolute;

    background: url(${(props) => (props.imageURL ? props.imageURL : `${icons.LoginPage.iconUser}`)})
      no-repeat;
    background-size: ${(props) => (props.imageSize ? props.imageSize : '20px')};
    background-position: ${(props) => (props.imagePosition ? props.imagePosition : '19px 15px')};

    content: '';
  }
`;

const Input = styled.input<InputProps>`
  width: 374px;
  height: 50px;

  padding-left: 48px;

  background-color: ${colors['form-tag']};

  outline: none;
  border-radius: 20px;
  border: ${(props) =>
    props.isError
      ? `1px solid ${colors['border-error']}`
      : `1px solid ${colors['border-default']}`};

  font-size: 16px;

  &::placeholder {
    font-size: ${fontSizes.medium};
  }
`;

const ButtonWrapper = styled.div`
  width: 370px;
  height: 55px;
`;

const Another = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Span = styled.span`
  font-size: 16px;
  color: ${colors['text-tertiary']};
`;

const ErrorMessage = styled.div`
  margin-top: 10px;

  font-size: 12px;
  color: ${colors['text-error']};

  white-space: pre-wrap;
`;

import styled from 'styled-components';
import BackGround from '../../../Assets/Image/LoginPage/login_background.png';
import UserIcon from '../../../Assets/Image/LoginPage/icon_user.png';
import LockIcon from '../../../Assets/Image/LoginPage/icon_lock.png';
import { Link, useNavigate } from 'react-router-dom';
import { colors, fontSizes } from '../../../Styles/theme';
import { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';
import useInput from '../../../Hooks/useInput';
import { onError } from './function';

type InputType = {
  id: string;
  pw: string;
};

type InputProps = {
  isError: boolean;
};

type ErrorProps = {
  isError: boolean;
};

type ErrorType = {
  errorId?: string;
  errorPw?: string;
};

const SignInPage = () => {
  const navigate = useNavigate();

  const { inputs, onInputChange } = useInput<InputType>({
    id: '',
    pw: '',
  });

  const [errors, setErrors] = useState<ErrorType>();

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

    const idValid = await isIdValid(id);

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
        const failLogin = error.response.data.state;
        console.log(failLogin);

        setErrors(
          onError({
            id,
            idValid: idValid,
            pw,
            login: failLogin,
          })
        );
      });
  };

  return (
    <Container>
      <Logo>
        <Title>CheckPass</Title>
        <SubTitle>우리들의 편리한 출결을 위한 서비스</SubTitle>
      </Logo>
      <Form onSubmit={onSubmit}>
        <InputWrapper>
          <FormItem>
            <Input
              isError={!!errors?.errorId}
              type="text"
              autoComplete="current-id"
              placeholder="아이디를 입력하세요"
              name="id"
              value={id}
              onChange={onInputChange}
            />
          </FormItem>
          <FormItem imageURL={LockIcon} imageSize="17px" imagePosition="20px 14px">
            <Input
              isError={!!errors?.errorPw}
              type="password"
              autoComplete="current-password"
              placeholder="비밀번호를 입력하세요"
              name="pw"
              value={pw}
              onChange={onInputChange}
            />
            {/* {errors && <ErrorMessage>{errors.errorLogin}</ErrorMessage>} */}
          </FormItem>
        </InputWrapper>
        <ErrorWrapper isError={!!errors?.errorId || !!errors?.errorPw}>
          {errors && (
            <ErrorMessage>
              {errors.errorId?.split('\n').map((message, idx) => (
                <span key={idx}>
                  {message}
                  <br />
                </span>
              ))}
            </ErrorMessage>
          )}
          {errors && (
            <ErrorMessage>
              {errors.errorPw?.split('\n').map((message, idx) => (
                <span key={idx}>
                  {message}
                  <br />
                </span>
              ))}
            </ErrorMessage>
          )}
        </ErrorWrapper>
        <Button isError={!!errors?.errorId || !!errors?.errorPw}>로그인</Button>
        <Another>
          <Link to="/signUp/selectJob">
            <Span>새 계정 만들기</Span>
          </Link>
          <Span>|</Span>
          <Link to="/findPw">
            <Span>비밀번호 찾기</Span>
          </Link>
        </Another>
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

const Form = styled.form`
  width: 450px;

  padding: 40px 38px;

  background-color: ${colors['form-component']};
  border-radius: 36px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const InputWrapper = styled.div`
  width: 374px;
  height: auto;

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

    background: url(${(props) => (props.imageURL ? props.imageURL : `${UserIcon}`)}) no-repeat;
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

const Button = styled.button<ErrorProps>`
  margin-top: ${(props) => (props.isError ? `0px` : `13px`)};

  width: 374px;
  height: 55px;

  background-color: ${colors.button};
  border-radius: 20px;
  border: none;
  color: ${colors['button-text']};
  font-size: ${fontSizes['button-pw']};

  cursor: pointer;
`;

const Another = styled.div`
  padding-top: 13px;

  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Span = styled.span`
  font-size: 16px;
  color: ${colors['text-tertiary']};
`;

const ErrorWrapper = styled.div<ErrorProps>`
  position: relative;
  display: flex;
  align-items: center;

  width: 374px;
  height: ${(props) => (props.isError ? `42px` : `0px`)};
`;

const ErrorMessage = styled.div`
  position: absolute;
  font-size: 12px;
  color: ${colors['text-error']};
`;

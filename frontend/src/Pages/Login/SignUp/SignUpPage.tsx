import styled from 'styled-components';
import { icons } from '@/common/icons';
import { colors, fontSizes } from '@/src/Styles/theme';
import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useSelect from '@/src/Hooks/useSelect';
import { JOBLIST } from '@/src/constants/signup';

type SelectType = {
  job: string;
};

type SelectProps = {
  isError: boolean;
};

const SignUpPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const { selects, onSelectChange } = useSelect<SelectType>({
    job: '',
  });

  const { job } = selects;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (job === '') {
      setError('구분: 필수 정보입니다.');
    } else {
      navigate(`/signUp/${job}`);
    }
  };

  return (
    <Page>
      <Container>
        <Logo>
          <Link to="/signIn">
            <Title>CHECKPASS</Title>
          </Link>
        </Logo>
        <Form onSubmit={onSubmit}>
          <Header>구분 선택</Header>
          <FormSection>
            <FormItem>
              <Select
                isError={!!error}
                name="job"
                value={job || 'default'}
                onChange={onSelectChange}
              >
                {JOBLIST.map((job) => (
                  <Option value={job.value} key={job.value} disabled={job.value === 'default'}>
                    {job.name}
                  </Option>
                ))}
              </Select>
              {error && <ErrorMessage>{error}</ErrorMessage>}
            </FormItem>
          </FormSection>
          <ButtonWrap>
            <Button>다음</Button>
          </ButtonWrap>
        </Form>
      </Container>
    </Page>
  );
};

export default SignUpPage;

const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  background-image: url(${icons.LoginPage.loginBackground});
  background-size: cover;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 500px;
  gap: 20px;
`;

const Logo = styled.div`
  font-family: 'AppleTea';
  font-size: ${fontSizes['logo-side']};
`;

const Title = styled.span`
  color: ${colors['text-primary']};
`;

const Form = styled.form`
  width: 420px;

  background-color: ${colors['form-component']};

  box-shadow: 0 2px 4px ${colors['shadow-default']}, 0 8px 16px ${colors['shadow-default']};
  border-radius: 30px;
`;

const Header = styled.div`
  padding: 15px 0 12px 25px;
  font-size: ${fontSizes.medium};
  border-bottom: 1px solid ${colors['border-default']};
`;

const FormSection = styled.div`
  display: flex;
  justify-content: center;
`;

const FormItem = styled.div`
  padding: 13px;

  &::before {
    width: 40px;
    height: 40px;

    position: absolute;
    background-image: url(${icons.LoginPage.iconUser});

    background-size: 20px;
    background-repeat: no-repeat;
    background-position: 18px 14px;

    content: '';
  }
`;

const Select = styled.select<SelectProps>`
  padding-left: 42px;

  width: 370px;
  height: 50px;

  background-color: ${colors['form-tag']};

  border-radius: 18px;
  border: ${(props) =>
    props.isError
      ? `1px solid ${colors['border-error']}`
      : `1px solid ${colors['border-default']}`};

  font-size: ${fontSizes['medium']};
  color: ${colors['text-placeholder']};

  outline: none;
`;

const ErrorMessage = styled.div`
  font-size: 12px;
  margin-top: 10px;

  color: ${colors['text-error']};
`;

const Option = styled.option``;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;

  padding-bottom: 13px;
`;

const Button = styled.button`
  width: 370px;
  height: 50px;

  background-color: ${colors['button']};

  border: none;
  border-radius: 18px;

  color: ${colors['text-dark']};
  font-size: ${fontSizes['button-pw']};

  cursor: pointer;
`;
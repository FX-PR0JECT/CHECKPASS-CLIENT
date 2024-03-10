import styled from 'styled-components';
import { icons } from '@/common/icons';
import { colors, fontSizes } from '@/src/Styles/theme';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

type JobType = {
  value: 'default' | 'student' | 'profStaff';
  name: string;
};

type JobProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  isError: boolean;
};

const jobList: JobType[] = [
  { value: 'default', name: '구분' },
  { value: 'student', name: '학생' },
  { value: 'profStaff', name: '교수/교직원' },
];

const SignUpPage = () => {
  const navigate = useNavigate();
  const [selectJob, setSelectJob] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSelectJob = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectJob(e.target.value);
    setError('');
  };

  const handleNextButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (selectJob === 'default' || selectJob === '') {
      setError('구분: 필수 정보입니다.');
      return;
    }

    navigate(`/signUp/${selectJob}`);
  };

  return (
    <Page>
      <Container>
        <Logo>
          <Link to="/signIn">
            <Title>CHECKPASS</Title>
          </Link>
        </Logo>
        <Form>
          <Header>구분 선택</Header>
          <FormSection>
            <FormItem>
              <Job isError={!!error} onChange={handleSelectJob} value={selectJob || 'default'}>
                {jobList.map((job) => (
                  <Option value={job.value} key={job.value} disabled={job.value === 'default'}>
                    {job.name}
                  </Option>
                ))}
              </Job>
              {error && <ErrorMessage>{error}</ErrorMessage>}
            </FormItem>
          </FormSection>
          <ButtonWrap>
            <Button onClick={handleNextButton}>다음</Button>
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

const Job = styled(({ isError, ...props }: JobProps) => <select {...props} />)<JobProps>`
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

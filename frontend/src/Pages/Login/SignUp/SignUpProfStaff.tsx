import styled from 'styled-components';
import { icons } from '@/common/icons';
import { colors, fontSizes } from '@/src/Styles/theme';
import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';

import useInput from '@/src/Hooks/useInput';
import useSelect from '@/src/Hooks/useSelect';
import { onError, getDepartment, getHireDate } from './function';
import { PROF_STAFF } from '@/src/constants/signup';
import { COLLEGE, DEPARTMENT } from '@/src/constants/department';
import Button from '@/src/components/Button';
import Input from '@/src/components/Input';
import Error from '@/src/components/Error';
import Select from '@/src/components/Select';

type InputType = {
  id: string;
  pw: string;
  confirmPw: string;
  name: string;
  hireDate: string;
};

type SelectType = {
  profStaff: string;
  college: string;
  department: string;
};

type ErrorType = {
  errorId: string;
  errorPw: string;
  errorConfirmPw: string;
  errorName: string;
  errorProfStaff?: string;
  errorCollege: string;
  errorHireDate?: string;
};

const SignUpProfStaff = () => {
  const navigate = useNavigate();
  const [disabledCollege, setDisabledCollege] = useState<boolean>(false);
  const [disabledDepartment, setDisabledDepartment] = useState<boolean>(false);

  const { inputs, setInputs, onInputChange } = useInput<InputType>({
    id: '',
    pw: '',
    confirmPw: '',
    name: '',
    hireDate: '',
  });

  const { selects, setSelects, onSelectChange } = useSelect<SelectType>({
    profStaff: '',
    college: '',
    department: '',
  });

  const [errors, setErrors] = useState<ErrorType>();

  const { id, pw, confirmPw, name, hireDate } = inputs;
  const { profStaff, college, department } = selects;

  // 회원가입 떄 필요한 select
  const onCollegeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    onSelectChange(e);

    if (value !== 'default') {
      setDisabledDepartment(true);
    } else {
      setDisabledDepartment(false);
    }

    if (value === 'FacultyOfLiberalArts' || value === 'Free' || value === 'CreativeConvergence') {
      setDisabledCollege(true);
    } else {
      setDisabledCollege(false);
    }

    // department 값을 DEPARTMENT의 첫 번째 값으로 설정
    setSelects((prev) => ({
      ...prev,
      department: DEPARTMENT[value]?.[0]?.value || '',
    }));
  };

  // 입사일 조건
  const onHireDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const hireDate = getHireDate(value);

    setInputs((prev) => ({
      ...prev,
      hireDate,
    }));
  };

  // 중복 Id 확인
  const isSameIdValid = async (id: string) => {
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

  // 회원가입 실행
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const sameIdValid = await isSameIdValid(id);

    // 회원가입 input, select 조건, 부합하지 않으면 에러메시지 출력
    const errorMessage = onError({
      id,
      sameId: sameIdValid,
      pw,
      confirmPw,
      name,
      college,
      profStaff,
      hireDate,
    });
    setErrors(errorMessage);

    // 에러 메시지가 존재하면 서버로 데이터를 보내지 않음
    if (Object.values(errorMessage).some((error) => error && error !== '')) {
      return;
    }

    const userInfo = {
      signUpId: id,
      signUpPassword: pw,
      signUpName: name,
      signUpJob: profStaff,
      signUpCollege: college,
      ...getDepartment(college, department),
      signUpHireDate: hireDate,
    };

    // userInfo 속성 다 채워야 데이터 전송
    if (Object.values(userInfo).every((value) => value !== '')) {
      await axios
        .post('http://localhost:8080/users/professorSignup', userInfo)
        .then((response) => {
          if (response.status === 200) {
            navigate('/signIn');
            alert('회원가입이 완료되었습니다.');
          }
        })
        .catch((error) => {
          console.log(error);
        });
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
          <FormSection>
            <Input
              isError={!!errors?.errorId}
              type="text"
              placeholder="아이디 (학번)"
              name="id"
              value={id}
              onChange={onInputChange}
              startIcon={{ url: icons.LoginPage.iconUser, size: 20, position: [19, 15] }}
            />
            {errors && <Error>{errors.errorId}</Error>}
            <Input
              isError={!!errors?.errorPw}
              type="password"
              placeholder="비밀번호"
              name="pw"
              value={pw}
              onChange={onInputChange}
              startIcon={{ url: icons.LoginPage.iconLock, size: 17, position: [20, 14] }}
            />
            {errors && <Error>{errors.errorPw}</Error>}
            <Input
              isError={!!errors?.errorConfirmPw}
              type="password"
              placeholder="비밀번호 확인"
              name="confirmPw"
              value={confirmPw}
              onChange={onInputChange}
              startIcon={{ url: icons.LoginPage.iconLock, size: 17, position: [20, 14] }}
            />
            {errors && <Error>{errors.errorConfirmPw}</Error>}
            <Input
              isError={!!errors?.errorName}
              type="text"
              placeholder="이름"
              name="name"
              value={name}
              onChange={onInputChange}
              startIcon={{ url: icons.LoginPage.iconId, size: 22.5, position: [18, 15] }}
            />
            {errors && <Error>{errors.errorName}</Error>}
            <Select
              isError={!!errors?.errorProfStaff}
              name="profStaff"
              value={profStaff || 'default'}
              onChange={onSelectChange}
              fontSize="sm"
              startIcon={{ url: icons.LoginPage.iconCollege, size: 22.5, position: [19, 14] }}
            >
              {PROF_STAFF.map((profStaff) => (
                <Option
                  value={profStaff.value}
                  key={profStaff.value}
                  disabled={profStaff.value === 'default'}
                >
                  {profStaff.name}
                </Option>
              ))}
            </Select>
            {errors && <Error>{errors.errorProfStaff}</Error>}
            <College>
              <Select
                isError={!!errors?.errorCollege}
                name="college"
                value={college || 'default'}
                onChange={onCollegeChange}
                fontSize="sm"
                startIcon={{ url: icons.LoginPage.iconCollege, size: 22.5, position: [19, 14] }}
              >
                {COLLEGE.map((college) => (
                  <Option
                    value={college.value}
                    key={college.value}
                    disabled={college.value === 'default'}
                  >
                    {college.name}
                  </Option>
                ))}
              </Select>
              <Select
                defaultValue="학과"
                isError={!!errors?.errorCollege}
                name="department"
                value={department}
                onChange={onSelectChange}
                disabled={disabledCollege}
                fontSize="sm"
                startIcon={{ url: icons.LoginPage.iconCollege, size: 22.5, position: [19, 14] }}
              >
                <Option value="학과" disabled={disabledDepartment}>
                  학과
                </Option>
                {DEPARTMENT[college]?.map((department) => (
                  <Option value={department.value} key={department.value}>
                    {department.name}
                  </Option>
                ))}
              </Select>
            </College>
            {errors && <Error>{errors.errorCollege}</Error>}
            <Input
              isError={!!errors?.errorHireDate}
              type="text"
              placeholder="입사일"
              name="hireDate"
              value={hireDate}
              onChange={onHireDateChange}
              startIcon={{ url: icons.LoginPage.iconUser, size: 20, position: [19, 15] }}
            />
            {errors && <Error>{errors.errorHireDate}</Error>}
            <ButtonWrapper>
              <Button size="lg">회원가입</Button>
            </ButtonWrapper>
          </FormSection>
        </Form>
      </Container>
    </Page>
  );
};
export default SignUpProfStaff;

const Page = styled.div`
  padding: 70px 0;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  min-height: 100vh;
  height: 100%;

  background: url(${icons.LoginPage.loginBackground});
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

  padding: 25px;

  background-color: ${colors['form-component']};

  box-shadow: 0 2px 4px ${colors['shadow-default']}, 0 8px 16px ${colors['shadow-default']};
  border-radius: 30px;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 10px;
`;

const College = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
`;

const Option = styled.option``;

const ButtonWrapper = styled.div`
  width: 370px;
  height: 50px;
`;

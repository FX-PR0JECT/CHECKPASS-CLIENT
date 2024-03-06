import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

import background from '../../../Assets/Image/LoginPage/login_background.png';
import userIcon from '../../../Assets/Image/LoginPage/icon_user.png';
import pwIcon from '../../../Assets/Image/LoginPage/icon_lock.png';
import collegeIcon from '../../../Assets/Image/LoginPage/icon_college.png';
import nameIcon from '../../../Assets/Image/LoginPage/icon_id.png';
import { colors, fontSizes } from '../../../Styles/theme';
import { COLLEGE, DEPARTMENT } from '../../../constants/department';
import { ChangeEvent, FormEvent, useState } from 'react';
import { PROF_STAFF } from '../../../constants/signup';
import useInput from '../../../Hooks/useInput';
import useSelect from '../../../Hooks/useSelect';
import { getDepartment, getHireDate, onError } from './function';
import axios from 'axios';

// id, password, (confirmPassword), name, job, college, department, hiredate
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

type InputProps = {
  isError: boolean;
};

type SelectProps = SelectStyleProps & {
  isError: boolean;
};

const SignUpProfStaff = () => {
  const navigate = useNavigate();
  const [disabledDepartment, setdisabledDepartment] = useState(false);

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

    if (value === 'FacultyOfLiberalArts' || value === 'Free' || value === 'CreativeConvergence') {
      setdisabledDepartment(true);
    } else {
      setdisabledDepartment(false);
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
    console.log(errorMessage);
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
            <FormItem>
              <Input
                isError={!!errors?.errorId}
                type="text"
                placeholder="아이디 (학번)"
                name="id"
                value={id}
                onChange={onInputChange}
              ></Input>
              {errors && <ErrorMessage>{errors.errorId}</ErrorMessage>}
            </FormItem>
            <FormItem imageURL={pwIcon} imageSize="17px" imagePosition="20px 14px">
              <Input
                isError={!!errors?.errorPw}
                type="password"
                placeholder="비밀번호"
                name="pw"
                value={pw}
                onChange={onInputChange}
              ></Input>
              {errors && <ErrorMessage>{errors.errorPw}</ErrorMessage>}
            </FormItem>
            <FormItem imageURL={pwIcon} imageSize="17px" imagePosition="20px 14px">
              <Input
                isError={!!errors?.errorConfirmPw}
                type="password"
                placeholder="비밀번호 확인"
                name="confirmPw"
                value={confirmPw}
                onChange={onInputChange}
              ></Input>
              {errors && <ErrorMessage>{errors.errorConfirmPw}</ErrorMessage>}
            </FormItem>
            <FormItem imageURL={nameIcon} imageSize="22.5px" imagePosition="18px 15px">
              <Input
                isError={!!errors?.errorName}
                type="text"
                placeholder="이름"
                name="name"
                value={name}
                onChange={onInputChange}
              ></Input>
              {errors && <ErrorMessage>{errors.errorName}</ErrorMessage>}
            </FormItem>
            <FormItem imageURL={collegeIcon} imagePosition="19px 14px">
              <Select
                isError={!!errors?.errorProfStaff}
                name="profStaff"
                value={profStaff || 'default'}
                onChange={onSelectChange}
                selectWidth="370px"
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
              {errors && <ErrorMessage>{errors.errorProfStaff}</ErrorMessage>}
            </FormItem>
            <College>
              <FormItem imageURL={collegeIcon} imagePosition="19px 14px">
                <Select
                  isError={!!errors?.errorCollege}
                  name="college"
                  value={college || 'default'}
                  onChange={onCollegeChange}
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
                {errors && <ErrorMessage>{errors.errorCollege}</ErrorMessage>}
              </FormItem>
              <FormItem imageURL={collegeIcon} imagePosition="19px 14px">
                <Select
                  defaultValue="학과"
                  isError={!!errors?.errorCollege}
                  name="department"
                  value={department}
                  onChange={onSelectChange}
                  disabled={disabledDepartment}
                >
                  <Option value="학과">학과</Option>
                  {DEPARTMENT[college]?.map((department) => (
                    <Option value={department.value} key={department.value}>
                      {department.name}
                    </Option>
                  ))}
                </Select>
              </FormItem>
            </College>
            <FormItem>
              <Input
                isError={!!errors?.errorHireDate}
                type="text"
                placeholder="입사일"
                name="hireDate"
                value={hireDate}
                onChange={onHireDateChange}
              />
              {errors && <ErrorMessage>{errors.errorHireDate}</ErrorMessage>}
            </FormItem>
          </FormSection>
          <ButtonWrap>
            <Button>회원가입</Button>
          </ButtonWrap>
        </Form>
      </Container>
    </Page>
  );
};
export default SignUpProfStaff;

interface SelectStyleProps {
  selectWidth?: string;
}

interface ImageProps {
  imageURL?: string;
  imageSize?: string;
  imagePosition?: string;
}

const Page = styled.div`
  padding: 70px 0;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  min-height: 100vh;
  height: 100%;

  background: url(${background});
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

  padding: 25px 0 25px 0;

  background-color: ${colors['form-component']};

  box-shadow: 0 2px 4px ${colors['shadow-default']}, 0 8px 16px ${colors['shadow-default']};
  border-radius: 30px;
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

    background: url(${(props) => (props.imageURL ? props.imageURL : `${userIcon}`)}) no-repeat;
    background-size: ${(props) => (props.imageSize ? props.imageSize : '20px')};
    background-position: ${(props) => (props.imagePosition ? props.imagePosition : '19px 15px')};

    content: '';
  }
`;

const College = styled.div`
  display: flex;
  gap: 10px;
`;

const Select = styled.select<SelectProps>`
  width: ${(props) => (props.selectWidth ? props.selectWidth : '180px')};
  height: 50px;

  padding-left: 42px;

  background-color: ${colors['form-tag']};

  outline: none;
  border-radius: 18px;
  border: ${(props) =>
    props.isError
      ? `1px solid ${colors['border-error']}`
      : `1px solid ${colors['border-default']}`};

  font-size: ${fontSizes.small};
  color: ${colors['text-placeholder']};
`;

const Option = styled.option``;

const Input = styled.input<InputProps>`
  width: 370px;
  height: 50px;

  padding-left: 47px;

  background-color: ${colors['form-tag']};

  outline: none;
  border-radius: 20px;
  border: ${(props) =>
    props.isError
      ? `1px solid ${colors['border-error']}`
      : `1px solid ${colors['border-default']}`};

  font-size: ${fontSizes.small};
  font-family: 'AppleGothicR';
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;

  padding-top: 13px;
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

const ErrorMessage = styled.div`
  font-size: 12px;
  margin-top: 10px;

  color: ${colors['text-error']};
`;

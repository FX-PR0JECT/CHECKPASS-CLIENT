import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

import background from '../../../Assets/Image/LoginPage/login_background.png';
import userIcon from '../../../Assets/Image/LoginPage/icon_user.png';
import pwIcon from '../../../Assets/Image/LoginPage/icon_lock.png';
import collegeIcon from '../../../Assets/Image/LoginPage/icon_college.png';
import nameIcon from '../../../Assets/Image/LoginPage/icon_id.png';
import moonIcon from '../../../Assets/Image/moon.png';
import { colors, fontSizes } from '../../../Styles/theme';
import { COLLEGE, DEPARTMENT } from '../../../constants/department';
import { ChangeEvent, FormEvent, useState } from 'react';
import { DAY_OR_NIGHT, GRADE, SEMESTER } from '../../../constants/signup';
import useInput from '../../../Hooks/useInput';
import useSelect from '../../../Hooks/useSelect';
import { getDepartment, onError } from './function';
import axios from 'axios';

type InputType = {
  id: string;
  pw: string;
  confirmPw: string;
  name: string;
};

type SelectType = {
  profStaff: string;
  college: string;
  department: string;
  grade: string;
  dayOrNight: string;
  semester: string;
};

type ErrorType = {
  errorId: string;
  errorPw: string;
  errorConfirmPw: string;
  errorName: string;
  errorCollege: string;
  errorGrade?: string;
  errorDayOrNight?: string;
  errorSemester?: string;
};

type InputProps = {
  isError: boolean;
};

type SelectProps = SelectStyleProps & {
  isError: boolean;
};

const SignUpStudent = () => {
  const navigate = useNavigate();
  const [disabledDepartment, setdisabledDepartment] = useState<boolean>(false);

  const { inputs, onInputChange } = useInput<InputType>({
    id: '',
    pw: '',
    confirmPw: '',
    name: '',
  });

  const { selects, setSelects, onSelectChange } = useSelect<SelectType>({
    profStaff: '',
    college: '',
    department: '',
    grade: '',
    dayOrNight: '',
    semester: '',
  });

  const [errors, setErrors] = useState<ErrorType>();

  const { id, pw, confirmPw, name } = inputs;
  const { college, department, grade, dayOrNight, semester } = selects;

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

    // input, select 조건, 부합하지 않으면 에러메시지 출력
    setErrors(
      onError({
        id,
        sameId: sameIdValid,
        pw,
        confirmPw,
        name,
        college,
        grade,
        dayOrNight,
        semester,
      })
    );

    const userInfo = {
      signUpId: id,
      signUpPassword: pw,
      signUpName: name,
      signUpJob: 'STUDENTS',
      signUpCollege: college,
      ...getDepartment(college, department),
      signUpGrade: grade,
      signUpDayOrNight: dayOrNight,
      signUpSemester: semester,
    };

    // userInfo 속성 다 채워야 데이터 전송
    if (Object.values(userInfo).every((value) => value !== '')) {
      await axios
        .post('http://localhost:8080/users/studentSignup', userInfo)
        .then((response) => {
          if (response.status === 200) {
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
                  value={department || 'default'}
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
            <FormItem imageURL={collegeIcon} imagePosition="19px 14px">
              <Select
                isError={!!errors?.errorGrade}
                name="grade"
                value={grade || 'default'}
                onChange={onSelectChange}
                selectWidth="370px"
              >
                {GRADE.map((grade) => (
                  <Option
                    value={grade.value}
                    key={grade.value}
                    disabled={grade.value === 'default'}
                  >
                    {grade.name}
                  </Option>
                ))}
              </Select>
              {errors && <ErrorMessage>{errors.errorGrade}</ErrorMessage>}
            </FormItem>
            <FormItem imageURL={moonIcon} imageSize="17px" imagePosition="20px 16px">
              <Select
                isError={!!errors?.errorDayOrNight}
                name="dayOrNight"
                value={dayOrNight || 'default'}
                onChange={onSelectChange}
                selectWidth="370px"
              >
                {DAY_OR_NIGHT.map((dayOrNight) => (
                  <Option
                    value={dayOrNight.value}
                    key={dayOrNight.value}
                    disabled={dayOrNight.value === 'default'}
                  >
                    {dayOrNight.name}
                  </Option>
                ))}
              </Select>
              {errors && <ErrorMessage>{errors.errorDayOrNight}</ErrorMessage>}
            </FormItem>
            <FormItem imageURL={moonIcon} imageSize="17px" imagePosition="20px 16px">
              <Select
                isError={!!errors?.errorSemester}
                name="semester"
                value={semester || 'default'}
                onChange={onSelectChange}
                selectWidth="370px"
              >
                {SEMESTER.map((semester) => (
                  <Option
                    value={semester.value}
                    key={semester.value}
                    disabled={semester.value === 'default'}
                  >
                    {semester.name}
                  </Option>
                ))}
              </Select>
              {errors && <ErrorMessage>{errors.errorSemester}</ErrorMessage>}
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

export default SignUpStudent;

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

  background: url(${background}) no-repeat;
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

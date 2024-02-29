import styled from 'styled-components';
import { Link } from 'react-router-dom';

import background from '../../../Assets/Image/LoginPage/login_background.png';
import userIcon from '../../../Assets/Image/LoginPage/icon_user.png';
import pwIcon from '../../../Assets/Image/LoginPage/icon_lock.png';
import collegeIcon from '../../../Assets/Image/LoginPage/icon_college.png';
import nameIcon from '../../../Assets/Image/LoginPage/icon_id.png';
import moonIcon from '../../../Assets/Image/moon.png';
import { colors, fontSizes } from '../../../Styles/theme';
import { COLLEGE, DEPARTMENT } from '../../../constants/department';
import { ChangeEvent, useState } from 'react';

const DAY_OR_NIGHT = ['주간/야간', '주간', '야간'];
const SEMESTER = ['학기', '1학기', '2학기'];

// id, password, (confirmPassword), name, job, college, department, grade, dayornight, semester

const SignUpStudent = () => {
  const [selectedCollege, setSelectedCollege] = useState('대학/학부');
  const [selectedDepartment, setSelectedDepartment] = useState(false);

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCollege(value);

    if (value === '교양학부' || value === '자유전공학부' || value === '창의융합학부') {
      setSelectedDepartment(true);
    } else {
      setSelectedDepartment(false);
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
        <Form>
          <FormSection>
            <FormItem>
              <Input type="text" placeholder="아이디 (학번)"></Input>
            </FormItem>
            <FormItem imageURL={pwIcon} imageSize="17px" imagePosition="20px 14px">
              <Input type="password" placeholder="비밀번호"></Input>
            </FormItem>
            <FormItem imageURL={pwIcon} imageSize="17px" imagePosition="20px 14px">
              <Input type="password" placeholder="비밀번호 확인"></Input>
            </FormItem>
            <FormItem imageURL={nameIcon} imageSize="22.5px" imagePosition="18px 15px">
              <Input type="text" placeholder="이름"></Input>
            </FormItem>
            <College>
              <FormItem imageURL={collegeIcon} imagePosition="19px 14px">
                <Select value={selectedCollege} onChange={onSelectChange}>
                  <Option selected disabled>
                    대학/학부
                  </Option>
                  {COLLEGE.map((college) => (
                    <Option value={college} key={college}>
                      {college}
                    </Option>
                  ))}
                </Select>
              </FormItem>
              <FormItem imageURL={collegeIcon} imagePosition="19px 14px">
                <Select disabled={selectedDepartment}>
                  <Option selected disabled>
                    학과
                  </Option>
                  {DEPARTMENT[selectedCollege]?.map((college) => (
                    <Option value={college} key={college}>
                      {college}
                    </Option>
                  ))}
                </Select>
              </FormItem>
            </College>
            <FormItem imageURL={collegeIcon} imagePosition="19px 14px">
              <Select selectWidth="370px">
                <Option selected disabled>
                  학년
                </Option>
                <Option>1학년</Option>
                <Option>2학년</Option>
                <Option>3학년</Option>
                <Option>4학년</Option>
              </Select>
            </FormItem>
            <FormItem imageURL={moonIcon} imageSize="17px" imagePosition="20px 16px">
              <Select selectWidth="370px">
                {DAY_OR_NIGHT.map((day) => (
                  <Option value={day} key={day}>
                    {day}
                  </Option>
                ))}
              </Select>
            </FormItem>
            <FormItem imageURL={moonIcon} imageSize="17px" imagePosition="20px 16px">
              <Select selectWidth="370px">
                {SEMESTER.map((semester) => (
                  <Option value={semester} key={semester}>
                    {semester}
                  </Option>
                ))}
              </Select>
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

interface SelectProps {
  selectWidth?: string;
}

interface ImageProps {
  imageURL?: string;
  imageSize?: string;
  imagePosition?: string;
}

const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

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
  border: 1px solid ${colors['border-default']};

  font-size: ${fontSizes.small};
  color: ${colors['text-placeholder']};
`;

const Option = styled.option``;

const Input = styled.input`
  width: 370px;
  height: 50px;

  padding-left: 47px;

  background-color: ${colors['form-tag']};

  outline: none;
  border-radius: 20px;
  border: 1px solid ${colors['border-default']};

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

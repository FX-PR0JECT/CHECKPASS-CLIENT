import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { fontSizes, colors } from '../../Styles/theme';
import MoonIcon from '../../Assets/Image/moon.png';

interface UserData {
  userName: string;
  userNumber: string;
  userCollege: string;
  userDepartment: string;
  userJopType: string;
  userGrade: string;
  userSemester: string;
  userDayOrNight: string;
  userHireDate: string;
}

const UserPage = () => {
  const [view, setView] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData>({
    userName: '',
    userNumber: '',
    userCollege: '',
    userDepartment: '',
    userJopType: '',
    userGrade: '',
    userSemester: '',
    userDayOrNight: '',
    userHireDate: '',
  });

  const handleProfileClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setView(!view);
  };

  const handleOutsideClick = () => {
    setView(false);
  };

  const getDayOrNight = (info: string) => {
    if (info === 'day') return '주간';
    else return '야간';
  };

  const getUserInformation = async () => {
    try {
      const response = await axios.get('http://localhost:8080/users');
      const userId = response.data.resultSet.userId;
      
      setUserData((prevData) => ({
        ...prevData,
        userName: response.data.resultSet.userName,
        userNumber: userId,
      }));

      const user = await axios.get(`http://localhost:8080/users/${userId}`);
      const userInfo = user.data.resultSet;

      setUserData((prevData) => ({
        ...prevData,
        userJopType: userInfo.userJob,
        userCollege: userInfo.userCollege,
        userDepartment: userInfo.userDepartment,
      }));

      if (userInfo.userJob === 'STUDENTS') {
        setUserData((prevData) => ({
          ...prevData,
          userGrade: userInfo.studentGrade,
          userSemester: userInfo.studentSemester,
          userDayOrNight: getDayOrNight(userInfo.dayOrNight),
        }));
      } else {
        setUserData(prevData => ({
          ...prevData,
          userHireDate: userInfo.hireDate
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const auth = async () => {
      try {
        await getUserInformation();
      } catch (error) {
        console.error(error);
      }
    };
    auth();
  }, []);

  return (
    <Page onClick={handleOutsideClick}>
      <Header>
        <Logo>CHECKPASS</Logo>
        <IconBox>
          <ThemeIcon src={MoonIcon} alt="moon icon" />
          <Profile onClick={handleProfileClick}></Profile>
          {view && (
            <Menu>
              <ProfileList>내 정보</ProfileList>
              <ProfileList>로그아웃</ProfileList>
            </Menu>
          )}
        </IconBox>
      </Header>
      <Main>
        <ProfileContainer>
          <LeftContainer>
            <ProfileImage />
            <ChangeImageButton>이미지 업로드</ChangeImageButton>
            <ChangeImageButton delete>이미지 삭제</ChangeImageButton>
          </LeftContainer>
          <RightContainer>
            <UserName>{userData.userName}</UserName>
            <UserNumber>{userData.userNumber}</UserNumber>
            <InfoBox>
              <UserCollege>{userData.userCollege}</UserCollege>
              <UserDepartment>{userData.userDepartment}</UserDepartment>
            </InfoBox>
            {userData.userJopType === 'STUDENTS' ? (
              <UserInfo>
                {userData.userGrade} {userData.userSemester} {userData.userDayOrNight}
              </UserInfo>
            ) : (
              <UserInfo>입사 날짜 : {userData.userHireDate}</UserInfo>
            )}
          </RightContainer>
        </ProfileContainer>
      </Main>
    </Page>
  );
};

export default UserPage;

interface ButtonProps {
  delete?: boolean;
  children: React.ReactNode;
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  background-color: ${colors.white};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  width: 90%;
  height: 70px;

  padding: 0 10px;

  border-bottom: 1.5px solid ${colors['border-default']};
`;

const Logo = styled.div`
  font-size: ${fontSizes['header-logo']};
  font-family: 'AppleTea';
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ThemeIcon = styled.img`
  width: 44px;
  height: 44px;

  padding: 8px;

  cursor: pointer;

  &:hover {
    border-radius: 100%;
    background-color: ${colors.bubble};
  }
`;

const Profile = styled.button`
  width: 40px;
  height: 40px;

  background-color: transparent;
  border: 1px solid ${colors['border-dark']};
  border-radius: 100%;

  cursor: pointer;
`;

const Menu = styled.ul`
  width: 100px;
  list-style: none;

  position: absolute;
  top: 100%;

  background-color: ${colors.white};
  border-radius: 8px;
  box-shadow: 0 1px 8px ${colors['shadow-dark']};

  @keyframes dropdown {
    0% {
      transform: translateY(-10%);
    }
    100% {
      transform: translateY(0%);
    }
  }
  animation: dropdown 0.4s ease;
`;

const ProfileList = styled.li`
  display: block;
  padding: 15px 20px;
  border-bottom: 1px solid ${colors['border-default']};

  cursor: pointer;
`;

const Main = styled.div`
  display: flex;
  justify-content: center;
  width: 780px;
  height: calc(100vh - 70px);

  padding: 30px;
`;

const ProfileContainer = styled.div`
  display: flex;

  width: 700px;
  height: 250px;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 25%;
  padding: 15px;
  gap: 5px;
`;

const ProfileImage = styled.img`
  width: 135px;
  height: 135px;
  margin-bottom: 10px;

  border-radius: 100%;

  background-color: gray;
`;

const ChangeImageButton = styled.button<ButtonProps>`
  width: 130px;
  padding: 5px 0;

  background-color: ${(props) => (props.delete ? colors.white : colors.button)};
  border-radius: 20px;
  border: none;

  color: ${(props) => (props.delete ? colors.button : colors['button-text'])};
  font-size: ${fontSizes.medium};
  font-family: 'AppleGothicR';

  cursor: pointer;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 75%;
  padding: 30px;
  gap: 10px;

  border-left: 1px solid ${colors['border-default']};
`;

const UserName = styled.span`
  color: ${colors['text-primary']};
  font-size: ${fontSizes['greeting-message']};
  font-family: 'AppleGothicR';
`;

const UserNumber = styled.span`
  color: ${colors['text-tertiary']};
  font-size: ${fontSizes['large']};
  font-family: 'AppleGothicR';

  padding-left: 3px;
`;

const InfoBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  gap: 10px;
`;

const UserCollege = styled.span`
  color: ${colors['text-primary']};
  font-size: ${fontSizes['large']};
  font-family: 'AppleGothicR';
`;

const UserDepartment = styled.span`
  color: ${colors['text-secondary']};
  font-size: ${fontSizes['medium']};
  font-family: 'AppleGothicR';
`;

const UserInfo = styled(UserDepartment)`
  padding-left: 2px;
`;

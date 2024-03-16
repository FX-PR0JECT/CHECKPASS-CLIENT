import styled, { ThemeProvider } from 'styled-components';
import { MainTheme, colors, fontSizes } from '@/src/Styles/theme';
import axios from 'axios';
import { useEffect, useState } from 'react';

import useTheme from '@/src/Hooks/useTheme';
import Header from '@/src/components/Header';
import Button from '@/src/components/Button';

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
  const { isDarkMode, toggleTheme } = useTheme();

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
        setUserData((prevData) => ({
          ...prevData,
          userHireDate: userInfo.hireDate,
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
    <ThemeProvider theme={isDarkMode ? MainTheme.dark : MainTheme.light}>
      <Page>
        <Header mode={isDarkMode} themeHandler={toggleTheme} />
        <Main>
          <ProfileContainer>
            <LeftContainer>
              <ProfileImage />
              <ButtonWrapper>
                <Button>이미지 업로드</Button>
                <Button variant="secondary">이미지 삭제</Button>
              </ButtonWrapper>
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
    </ThemeProvider>
  );
};

export default UserPage;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  background-color: ${colors.white};

  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.bgColor};
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

const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: 130px;
  grid-template-rows: repeat(2, 32px);

  gap: 5px;
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
  font-size: ${fontSizes['large']};
  font-family: 'AppleGothicR';
`;

const UserDepartment = styled.span`
  font-size: ${fontSizes['medium']};
  font-family: 'AppleGothicR';
`;

const UserInfo = styled(UserDepartment)`
  padding-left: 2px;
`;

import { createBrowserRouter } from 'react-router-dom';
import MainPage from './Pages/Main/MainPage';
import SignInPage from './Pages/Login/SignIn/SignInPage';
import SignUpPage from './Pages/Login/SignUp/SignUpPage';
import SignUpStudent from './Pages/Login/SignUp/SignUpStudent';
import SignUpProfStaff from './Pages/Login/SignUp/SignUpProfStaff';
import FindPwPage from './Pages/Login/FindPwPage';
import CheckEmailPage from './Pages/Login/CheckEmailPage';
import AttendancePage from './Pages/Main/AttendancePage';
import LecturePage from './Pages/Main/LecturePage/LecturePage';
import EnrollmentPage from './Pages/Enrollment/EnrollmentPage';
import UserPage from './Pages/Main/UserPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/signUp/:job',
    element: <SignUpPage />,
  },
  {
    path: '/signUp/student',
    element: <SignUpStudent />,
  },
  {
    path: '/signUp/profStaff',
    element: <SignUpProfStaff />,
  },
  {
    path: '/signIn',
    element: <SignInPage />,
  },
  {
    path: '/findPw',
    element: <FindPwPage />,
  },
  {
    path: '/checkEmail',
    element: <CheckEmailPage />,
  },
  {
    path: '/attendance',
    element: <AttendancePage />,
  },
  {
    path: '/lecture',
    element: <LecturePage />,
  },
  {
    path: '/enrollment',
    element: <EnrollmentPage />,
  },
  {
    path: '/user/:userId',
    element: <UserPage />,
  },
]);

export default router;

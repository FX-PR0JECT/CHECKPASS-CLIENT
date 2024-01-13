import { createBrowserRouter } from 'react-router-dom';
import MainPage from './Pages/Main/MainPage';
import FindPwPage from './Pages/Login/FindPwPage';
import CheckEmailPage from './Pages/Login/CheckEmailPage';
import SignUpPage from './Pages/Login/SignUpPage';
import SignInPage from './Pages/Login/SignInPage';
import BeaconPage from './Pages/Main/BeaconPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/signIn',
    element: <SignInPage />,
  },
  {
    path: '/signUp',
    element: <SignUpPage />,
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
    path: "/beacon",
    element: <BeaconPage />,
  },

]);

export default router;

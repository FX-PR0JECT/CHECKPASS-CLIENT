import { createBrowserRouter } from 'react-router-dom';
import MainPage from './Pages/Main/MainPage';
import SignInPage from './Pages/Login/SignInPage';
import SignUpPage from './Pages/Login/SignUpPage';
import FindPwPage from './Pages/Login/FindPwPage';
import CheckEmailPage from './Pages/Login/CheckEmailPage';
import BeaconPage from './Pages/Main/BeaconPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/signUp',
    element: <SignUpPage />,
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
    path: "/beacon",
    element: <BeaconPage />,
  },

]);

export default router;

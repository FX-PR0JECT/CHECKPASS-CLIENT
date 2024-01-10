import { createBrowserRouter } from 'react-router-dom';
import MainPage from './Pages/Main/MainPage';
import FindPwPage from './Pages/Login/FindPwPage';
import CheckEmailPage from './Pages/Login/CheckEmailPage';
import SignUpPage from './Pages/Login/SignUpPage';
import SignInPage from './Pages/Login/SignInPage';

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
]);

export default router;

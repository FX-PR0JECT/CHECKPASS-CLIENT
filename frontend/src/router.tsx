import { createBrowserRouter } from "react-router-dom";
import MainPage from "./Pages/Main/MainPage";
import FindPwPage from "./Pages/Login/FindPwPage";
import CheckEmailPage from "./Pages/Login/CheckEmailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/findPw",
    element: <FindPwPage />,
  },
  {
    path: "/checkEmail",
    element: <CheckEmailPage />,
  },
]);

export default router;

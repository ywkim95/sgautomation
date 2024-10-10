import Home from "./pages/HomePage/Home.tsx";
import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/LoginPage/Login.tsx";
import { pageRoutes } from "./routes.ts";
import ErrorPage from "./pages/ErrorPage/Error/ErrorPage.tsx";
import NotFound from "./pages/ErrorPage/NotFound/NotFoundPage.tsx";
import { CommonLayout } from "./common/components/CommonLayout.tsx";
import ProtectedRoute from "./common/components/ProtectedRoute.tsx";

/**
 * App.tsx
 * 최상단에서 진행해야할 로직
 * 1. 라우팅
 * 2. 로그인 상태 관리
 * 3. 자동로그인 관련 로직
 * 4. axios 인터셉터
 *
 **/

export const router = createBrowserRouter([
  {
    element: <CommonLayout />,

    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: pageRoutes.main,
            element: <Home />,
            errorElement: <ErrorPage />,
          },
        ],
      },
      { path: pageRoutes.login, element: <Login /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

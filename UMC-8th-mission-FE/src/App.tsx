import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // ✅ 추가
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import HomeLayout from "./assets/layouts/HomeLayout";
import SignUpPage1 from "./pages/SignUpPage1";
import SignUpPage2 from "./pages/SignUpPage2";
import SignUpPage3 from "./pages/SignUpPage3";
import Mypage from "./pages/MyPage";
import ProtectedLayout from "./assets/layouts/ProtectedLayout";
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage";
import LPDetailPage from "./pages/LPDetailPage";

const queryClient = new QueryClient();

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup1", element: <SignUpPage1 /> },
      { path: "signup2", element: <SignUpPage2 /> },
      { path: "signup3", element: <SignUpPage3 /> },
      {
        path: "/v1/auth/google/callback",
        element: <GoogleLoginRedirectPage />,
      },
      {
        path: "/lp/:lpId",
        element: <LPDetailPage />,
      },
    ],
  },
];

const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "mypage",
        element: <Mypage />,
      },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

function App() {
  return (
    // QueryClientProvider로 RouterProvider를 감쌈
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;

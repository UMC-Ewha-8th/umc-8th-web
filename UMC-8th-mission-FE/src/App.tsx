import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LogInPage from "./pages/LoginPage";
import HomeLayout from "./assets/layouts/HomeLayout";
import SignUpPage1 from "./pages/SignUpPage1";
import SignUpPage2 from "./pages/SignUpPage2";
import SignUpPage3 from "./pages/SignUpPage3";
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LogInPage /> },
      { path: "signup", element: <SignUpPage1 /> },
      { path: "signup2", element: <SignUpPage2 /> },
      { path: "signup3", element: <SignUpPage3 /> },
      { path: "v1/auth/google/callback", element: <GoogleLoginRedirectPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

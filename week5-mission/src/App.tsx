import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import PremiumWebtoonPage from "./pages/PremiumWebtoonPage";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* 인증이 필요 없는 페이지 */}
          <Route path="/login" element={<LoginPage />} />
          {/* 인증이 필요한 페이지는 ProtectedRoute로 감싸서 사용 */}
          <Route
            path="/premium/webtoon/1"
            element={
              <ProtectedRoute>
                <PremiumWebtoonPage />
              </ProtectedRoute>
            }
          />
          {/* HomePage는 인증 여부와 관계없이 접근 가능 */}
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

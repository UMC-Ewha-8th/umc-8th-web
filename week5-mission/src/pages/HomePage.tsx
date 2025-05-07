import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="bg-white  p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4 text-black">홈페이지입니다!</h1>
        {isAuthenticated ? (
          <>
            <p className="text-gray-700 mb-6">
              로그인되었습니다! 프리미엄 컨텐츠를 볼 수 있습니다.
            </p>
            <button
              className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition"
              onClick={() => navigate("/premium/webtoon/1")}
            >
              프리미엄 웹툰 보기
            </button>
          </>
        ) : (
          <>
            <p className="text-gray-700 mb-6">
              프리미엄 컨텐츠를 보기 위해서는 로그인해주세요.
            </p>
            <button
              className="bg-gray-300 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-400 transition"
              onClick={() => navigate("/login")}
            >
              로그인 하러 가기
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;

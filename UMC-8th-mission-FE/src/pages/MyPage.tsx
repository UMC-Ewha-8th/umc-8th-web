import { useState, useEffect } from "react";
import { getMyInfo } from "../apis/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [data, setData] = useState<{ name?: string; email?: string }>({}); // 초기값을 객체로 설정

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getMyInfo();
        console.log(response);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div>
      {data.name ? (
        <>
          <h2>{data?.name}님 환영합니다.</h2>
          <p>Email: {data?.email}</p>

          <button
            className="cursor-pointer bg-purple-300 p-5 rounded-sm hover:scale-90"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        </>
      ) : (
        <p>Loading...</p> // 데이터가 없을 때 로딩 메시지 표시
      )}
    </div>
  );
};

export default MyPage;

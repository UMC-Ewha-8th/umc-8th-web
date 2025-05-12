import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// CustomFetch 활용해서 다시 해보기
const MyPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [data, setData] = useState([])

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      console.log(response);

      setData(response?.data)
    };

    getData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div>
      <h1>{data?.name}님 환영합니다.</h1>
      <img src={data?.avatar as string} alt={"구글 로고"} />
      <h1>{data?.email}</h1>

      <button 
        className="cursor-pointer bg-blue-300 rounded-sm p-5 hover:scale-90"
        onClick={handleLogout}
      >
        로그아웃
      </button>
    </div>
  );
};

export default MyPage;
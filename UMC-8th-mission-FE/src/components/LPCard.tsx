import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { LP } from "../types/lp";

interface LPCardProps {
  lp: LP;
  isLoggedIn: boolean; // 로그인 여부 props로 받기
}

const LPCard: FC<LPCardProps> = ({ lp, isLoggedIn }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isLoggedIn) {
      navigate(`/lp/${lp.id}`);
    } else {
      if (
        window.confirm(
          "로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까?"
        )
      ) {
        navigate("/login");
      }
    }
  };

  return (
    <div
      onClick={handleClick}
      className="relative overflow-hidden shadow-md transform transition duration-300 hover:scale-105 w-full group cursor-pointer"
      style={{ aspectRatio: "1 / 1" }}
    >
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="w-full h-full object-cover"
      />

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-80 transition duration-300" />
      <div className="absolute inset-0 flex flex-col justify-end items-start text-white text-left p-4 opacity-0 group-hover:opacity-100 transition duration-300">
        <h3 className="text-sm font-semibold">{lp.title}</h3>
        <p className="text-xs mt-1">
          업로드: {new Date(lp.createdAt).toLocaleDateString()}
        </p>
        <p className="text-xs mt-1">❤️ {lp.likes.length}</p>
      </div>
    </div>
  );
};

export default LPCard;

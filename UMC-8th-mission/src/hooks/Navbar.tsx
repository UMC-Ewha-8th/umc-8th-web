import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/* 항상 보이는 메뉴 */
const COMMON_LINKS = [
  { to: "/",               label: "홈" },
  { to: "/movies/popular", label: "인기 영화" },
  { to: "/movies/now_playing", label: "상영 중" },
  { to: "/movies/top_rated",   label: "평점 높은" },
  { to: "/movies/upcoming",    label: "개봉 예정" },
];

/* 비로그인(GUEST) 전용 */
const GUEST_LINKS = [
  { to: "/login",  label: "로그인" },
  { to: "/signup", label: "회원가입" },
];

/* 로그인(USER) 전용 */
const USER_LINKS = [
  { to: "/mypage", label: "마이페이지" },
  { to: "/search", label: "검색" },
];

export const Navbar = () => {
  const { accessToken } = useAuth();   // 토큰 존재 여부

  /* 표시할 링크 배열 만들기 */
  const links = accessToken
    ? [...COMMON_LINKS, ...USER_LINKS]      // 로그인 상태
    : [...COMMON_LINKS, ...GUEST_LINKS];    // 비로그인 상태

  /* 왼쪽 여백 auto를 줄 첫 메뉴 인덱스 (로그인 또는 마이페이지) */
  const splitIdx = COMMON_LINKS.length;     // 공통 메뉴 끝지점

  return (
    <nav className="flex gap-3 p-4">
      {links.map(({ to, label }, idx) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => {
            const base =
              isActive ? "text-[#b2dab1] font-bold" : "text-gray-500";
            /* 로그인·회원가입 또는 마이페이지·검색 블록을 오른쪽으로 밀기 */
            return idx === splitIdx ? `ml-auto ${base}` : base;
          }}
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
};

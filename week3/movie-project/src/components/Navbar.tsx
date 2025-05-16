import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { name: '홈', path: '/' },
    { name: '인기 영화', path: '/Movies/popular' },
    { name: '상영 중', path: '/Movies/now_playing' },
    { name: '평점 높은', path: '/Movies/top_rated' },
    { name: '개봉 예정', path: '/Movies/upcoming' },
  ];

  const getLinkClass = (path: string) => {
    return location.pathname === path
      ? 'text-red-500 font-bold'
      : 'text-gray-400 hover:text-red-300 transition duration-300';
  };

  return (
    <div>
      <nav className="flex justify-between items-center w-100 p-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={getLinkClass(item.path)}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {isOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-black/50 z-10" />
      )}
    </div>
  );
};

export default Navbar;

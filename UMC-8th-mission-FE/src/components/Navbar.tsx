import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white dark-bg-gray-900 shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-xl font-bold text-gray-800 dark:text-white"
        >
          SUMMER LP
        </Link>
        <div className="space-x-6">
          <Link
            to={"login"}
            className="text-gray-800 dark:text-white hover:text-purple-500"
          >
            로그인
          </Link>
          <Link
            to={"signup1"}
            className="text-gray-800 dark:text-white hover:text-purple-500"
          >
            회원가입
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

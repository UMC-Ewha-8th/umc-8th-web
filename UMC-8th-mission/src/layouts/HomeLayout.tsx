import { Outlet } from "react-router-dom";
import { Navbar } from "../hooks/Navbar";

const HomeLayout = () => {
  return (
    <div className="h-dvh flex flex-col">
      <nav>
        <Navbar />
      </nav>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer>푸터</footer>
    </div>
  );
};

export default HomeLayout;
import { Outlet } from "react-router-dom";
import { Navbar } from "../hooks/Navbar";
import Footer from "../components/Footer";

const HomeLayout = () => {
  return (
    <div className="h-dvh flex flex-col">
      <nav>
        <Navbar />
      </nav>
      <main className="flex-1 mt-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
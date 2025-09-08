import { Outlet } from "react-router-dom";
import { Navbar } from "../pages/Navbar";

const HomeLayout = () => (
    <>
        <Navbar />
        <Outlet />
    </>
);

export default HomeLayout;
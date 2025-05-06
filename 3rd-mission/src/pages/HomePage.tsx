import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

const HomePage = () => (
    <>
        <Navbar />
        <Outlet />
    </>
);

export default HomePage;
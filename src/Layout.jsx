import React, { useEffect } from "react";
import Navbar from "./components/navbar/Navbar.jsx";
import { Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer.jsx";
import { useSelector } from "react-redux";

function Layout() {
    const theme = useSelector((state) => state.theme.theme);
    useEffect(() => {
        if (theme === "light") {
            document.documentElement.classList.remove("dark");
        } else {
            document.documentElement.classList.add("dark");
        }
    }, []);
    return (
        <div className="min-h-screen bg-green-50 dark:bg-neutral-950">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
}

export default Layout;

import { Leaf, Moon, Sun } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { useDispatch, useSelector } from "react-redux";
import { darkTheme, lightTheme } from "@/store/features/themeSlice.js";
import { Label } from "@/components/ui/label.jsx";

function Navbar() {
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme.theme);
    const toggleTheme = () => {
        if (theme === "light") {
            dispatch(darkTheme());
        } else {
            dispatch(lightTheme());
        }
    };

    return (
        <header className="bg-white/50 w-full shadow-lg z-10">
            <div className="px-4 py-6 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <Leaf className="h-8 w-8 text-green-700" />
                    <h1 className="text-3xl font-bold text-green-700">
                        <Link to={"/"}>HerbWise</Link>
                    </h1>
                </div>
                <nav>
                    <ul className="flex space-x-4">
                        <li className="flex items-center space-x-2">
                            <Switch
                                className="data-[state=checked]:bg-green-700"
                                id="theme-toggle"
                                checked={theme === "dark"}
                                onCheckedChange={toggleTheme}
                            ></Switch>
                            <Label
                                htmlFor="theme-toggle"
                                className="text-green-700"
                            >
                                {theme === "light" ? <Moon /> : <Sun />}
                            </Label>
                        </li>
                        <li>
                            <Link
                                to="/"
                                className="text-green-700 hover:text-green-900"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/all-plants"
                                className="text-green-700 hover:text-green-900"
                            >
                                Plants
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/about"
                                className="text-green-700 hover:text-green-900"
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="#"
                                className="text-green-700 hover:text-green-900"
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;

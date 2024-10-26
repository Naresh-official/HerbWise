import { Leaf, Menu, Moon, Sun } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { useDispatch, useSelector } from "react-redux";
import { darkTheme, lightTheme } from "@/store/features/themeSlice.js";
import { Label } from "@/components/ui/label.jsx";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

function Navbar() {
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme.theme);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const toggleTheme = () => {
        if (theme === "light") {
            dispatch(darkTheme());
        } else {
            dispatch(lightTheme());
        }
    };

    const toggleSheet = () => {
        setIsSheetOpen((prev) => !prev);
    };

    const handleCloseSheet = () => {
        setIsSheetOpen(false); // Ensure sheet closes on each link click
    };

    return (
        <header className="bg-white/50 dark:bg-neutral-950 w-full shadow-lg border-b-2 border-green-700 fixed z-10">
            <div className="px-4 py-6 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <Leaf className="h-8 w-8 text-green-700 dark:text-green-600" />
                    <h1 className="text-3xl font-bold text-green-700 dark:text-green-600">
                        <Link to="/" onClick={handleCloseSheet}>
                            HerbWise
                        </Link>
                    </h1>
                </div>
                <nav>
                    <ul className="hidden md:flex space-x-4 ">
                        <li className="flex items-center space-x-2">
                            <Switch
                                className="data-[state=checked]:bg-green-700"
                                id="theme-toggle"
                                checked={theme === "dark"}
                                onCheckedChange={toggleTheme}
                            />
                            <Label
                                htmlFor="theme-toggle"
                                className="text-green-700 dark:text-white"
                            >
                                {theme === "light" ? <Moon /> : <Sun />}
                            </Label>
                        </li>
                        <li>
                            <Link
                                to="/"
                                className="text-green-700 dark:text-white hover:text-green-900"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/all-plants"
                                className="text-green-700 dark:text-white hover:text-green-900"
                            >
                                Plants
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/about"
                                className="text-green-700 dark:text-white hover:text-green-900"
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="#"
                                className="text-green-700 dark:text-white hover:text-green-900"
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                    <Sheet open={isSheetOpen} className="md:hidden w-full">
                        <SheetTrigger asChild>
                            <Menu
                                className="text-green-700 dark:text-white"
                                onClick={toggleSheet}
                            />
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle className="w-full text-green-700 text-3xl dark:text-white">
                                    HerbWise
                                </SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col text-xl space-y-2 mt-5">
                                <div
                                    onClick={() => {
                                        toggleTheme();
                                        handleCloseSheet();
                                    }}
                                    className="flex items-center space-x-2 text-green-700 dark:text-white hover:text-green-900"
                                >
                                    <p>Theme</p>
                                    <span>
                                        {theme === "light" ? (
                                            <Moon className="w-5 h-5" />
                                        ) : (
                                            <Sun className="w-5 h-5" />
                                        )}
                                    </span>
                                </div>
                                <Link
                                    to="/"
                                    className="text-green-700 dark:text-white hover:text-green-900"
                                    onClick={handleCloseSheet}
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/all-plants"
                                    className="text-green-700 dark:text-white hover:text-green-900"
                                    onClick={handleCloseSheet}
                                >
                                    Plants
                                </Link>
                                <Link
                                    to="/about"
                                    className="text-green-700 dark:text-white hover:text-green-900"
                                    onClick={handleCloseSheet}
                                >
                                    About
                                </Link>
                                <Link
                                    to="#"
                                    className="text-green-700 dark:text-white hover:text-green-900"
                                    onClick={handleCloseSheet}
                                >
                                    Contact
                                </Link>
                            </div>
                        </SheetContent>
                    </Sheet>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;

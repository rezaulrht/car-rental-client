import React from "react";
import { BsSun, BsMoonStars } from "react-icons/bs";
import useTheme from "../hooks/useTheme";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle text-neutral hover:text-primary transition-colors duration-300"
            aria-label="Toggle Dark Mode"
        >
            {theme === "dark" ? (
                <BsSun className="w-5 h-5 md:w-6 md:h-6" />
            ) : (
                <BsMoonStars className="w-5 h-5 md:w-6 md:h-6" />
            )}
        </button>
    );
};

export default ThemeToggle;

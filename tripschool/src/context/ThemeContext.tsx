"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>("light");

    // Charger le thème depuis localStorage OU préférences système
    useEffect(() => {
        const stored = localStorage.getItem("theme") as Theme | null;
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        const initial = stored || (prefersDark ? "dark" : "light");
        setTheme(initial);

        document.documentElement.setAttribute("data-theme", initial);
    }, []);

    // Appliquer le thème à chaque changement
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
    return ctx;
}

"use client";

import { useTheme } from "@/context/ThemeContext";
import styles from "./ThemeToggle.module.scss";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button className={styles.toggle} onClick={toggleTheme}>
            {theme === "light" ? "🌙" : "☀️"}
        </button>
    );
}

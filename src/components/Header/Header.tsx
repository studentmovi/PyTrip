"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { ROUTES } from "@/config/route";
import styles from "./Header.module.scss";

export default function Header() {
    const { theme, toggleTheme } = useTheme();
    const pathname = usePathname();

    // CTA intelligent selon la page
    const isContactPage = pathname === "/contact";

    const ctaLabel = isContactPage ? "Download App" : "Contact Us";
    const ctaHref  = isContactPage ? ROUTES.download : ROUTES.contact;

    return (
        <header className={styles.header}>
            <div className={styles.container}>

                {/* Logo */}
                <div className={styles.left}>
                    <div className={styles.logoIcon}>
                        <svg fill="none" viewBox="0 0 48 48">
                            <path d="M24 45.8C19.7 45.8 15.5 44.5 11.9 42.1C8.3 39.7 5.5 36.3 3.8 32.3C2.2 28.36 1.76 23.97 2.61 19.74C3.45 15.51 5.52 11.63 8.57 8.58C11.63 5.52 15.51 3.45 19.74 2.61C23.97 1.76 28.36 2.2 32.34 3.85C36.33 5.5 39.74 8.29 42.13 11.88C44.53 15.47 45.81 19.68 45.81 24H24V45.8Z" fill="currentColor"/>
                        </svg>
                    </div>

                    <h2 className={styles.logoText}>PyTrip</h2>
                </div>

                {/* Navigation */}
                <nav className={styles.nav}>
                    <Link href={ROUTES.home}>Home</Link>
                    <Link href={ROUTES.features}>Features</Link>
                    <Link href={ROUTES.download}>Download</Link>

                    <Link href={ctaHref} className={styles.cta}>
                        {ctaLabel}
                    </Link>
                </nav>

                {/* Theme Toggle */}
                <button className={styles.themeToggle} onClick={toggleTheme}>
                    {theme === "light" ? "🌙" : "☀️"}
                </button>
            </div>
        </header>
    );
}

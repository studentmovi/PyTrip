import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { Header, Footer } from "@/components";
import UpdateManager from "@/components/UpdateManager/UpdateManager";
import AppUpdateManager from "@/components/AppUpdateManager/AppUpdateManager";

const geistSans = localFont({
    src: [
        { path: "../fonts/Geist-Regular.woff2", weight: "400" },
        { path: "../fonts/Geist-Medium.woff2", weight: "500" },
        { path: "../fonts/Geist-Bold.woff2", weight: "700" },
    ],
    variable: "--font-geist-sans",
    display: "swap",
});

const geistMono = localFont({
    src: [
        { path: "../fonts/GeistMono-Regular.woff2", weight: "400" },
    ],
    variable: "--font-geist-mono",
    display: "swap",
});

export const metadata: Metadata = {
    title: "TripSchool - Gérer vos voyages scolaires facilement",
    description:
        "TripSchool est une application open-source conçue pour aider les enseignants à organiser et gérer les voyages scolaires en toute simplicité.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider>
            <UpdateManager />
            <AppUpdateManager />

            <Header />

            {/* Empêche le footer de remonter sur les petites pages */}
            <main style={{ minHeight: "80vh" }}>
                {children}
            </main>

            <Footer />
        </ThemeProvider>
        </body>
        </html>
    );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { Header, Footer } from "@/components";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
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

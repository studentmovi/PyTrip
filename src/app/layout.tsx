import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";

import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { Header, Footer } from "@/components";
import UpdateManager from "@/components/UpdateManager/UpdateManager";
import AppUpdateManager from "@/components/AppUpdateManager/AppUpdateManager";
import CokieConsent from "@/components/CookieConsent/CookieConsent";

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
        <head>
            <Script id="consent-default" strategy="beforeInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                
                    // Default: deny everything (EEA-friendly)
                    gtag('consent', 'default', {
                      ad_storage: 'denied',
                      ad_user_data: 'denied',
                      ad_personalization: 'denied',
                      analytics_storage: 'denied',
                      functionality_storage: 'granted',
                      security_storage: 'granted'
                    });
                  `}
            </Script>

            {/* Google Tag Manager */}
            <Script id="gtm" strategy="afterInteractive">
                {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MDQ6TXGC');
          `}
            </Script>
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <noscript>
            <iframe
                src="https://www.googletagmanager.com/ns.html?id=GTM-MDQ6TXGC"
                height="0"
                width="0"
                style={{display: "none", visibility: "hidden"}}
            />
        </noscript>

        <ThemeProvider>
            <UpdateManager/>
            <AppUpdateManager/>

            <Header/>

            {/* Empêche le footer de remonter sur les petites pages */}
            <main style={{minHeight: "80vh"}}>
                {children}
            </main>

            <CokieConsent/>
            <Footer/>
        </ThemeProvider>
        </body>
        </html>
    );
}

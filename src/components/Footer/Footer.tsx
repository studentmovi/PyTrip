"use client";

import { useEffect, useState } from "react";
import styles from "./Footer.module.scss";

export default function Footer() {
    const [siteVersion, setSiteVersion] = useState<string | null>(null);

    useEffect(() => {
        async function loadVersion() {
            try {
                const res = await fetch("/version.json", { cache: "no-store" });
                const data = await res.json();

                if (data.version) {
                    setSiteVersion(data.version);
                }
            } catch (err) {
                console.error("Erreur lors de la récupération de la version du site :", err);
            }
        }

        loadVersion();
    }, []);

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <p>
                    © 2024 PyTrip. All Rights Reserved.
                    {siteVersion && (
                        <> • <span style={{ opacity: 0.8 }}>version : {siteVersion}</span></>
                    )}
                </p>

                <div className={styles.icons}>
                    <a href="#">
                        <svg width="24" height="24" stroke="currentColor" fill="none" strokeWidth="2"
                             strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                            <rect x="2" y="9" width="4" height="12"/>
                            <circle cx="4" cy="4" r="2"/>
                        </svg>
                    </a>

                    <a href="#">
                        <svg width="24" height="24" stroke="currentColor" fill="none" strokeWidth="2"
                             strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                            <path
                                d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                        </svg>
                    </a>
                </div>
            </div>
        </footer>
    );
}

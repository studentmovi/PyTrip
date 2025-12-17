"use client";

import { useEffect, useState } from "react";
import styles from "./AppUpdateManager.module.scss";

type Release = {
    version: string;
    changes: string[];
};

const THREE_DAYS = 1000 * 60 * 60 * 24 * 3;
const ONE_MONTH = 1000 * 60 * 60 * 24 * 30;

/**
 * UpdateAppManager
 * ----------------
 * Watches the Python app changelog repository and displays
 * a small notification when a new release is available.
 * This is NOT related to the website version.
 */
export default function AppUpdateManager() {
    const [release, setRelease] = useState<Release | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        async function checkUpdate() {
            try {
                const res = await fetch(
                    "https://raw.githubusercontent.com/studentmovi/ProjetDevOps/main/app/changelog.json",
                    { cache: "no-store" }
                );

                if (!res.ok) return;

                const data = await res.json();
                const latestVersion = data.latest;

                const latestRelease = data.releases.find(
                    (r: Release) => r.version === latestVersion
                );

                if (!latestRelease) return;

                const now = Date.now();

                const lastVersion = localStorage.getItem("appUpdate:lastVersion");
                const lastSeenTime = Number(
                    localStorage.getItem("appUpdate:lastSeenTime")
                );
                const firstSeenTime = Number(
                    localStorage.getItem("appUpdate:firstSeenTime")
                );

                // New version detected
                if (lastVersion !== latestVersion) {
                    localStorage.setItem("appUpdate:firstSeenTime", now.toString());
                    localStorage.setItem("appUpdate:lastSeenTime", "0");
                }

                const effectiveFirstSeen = firstSeenTime || now;

                // Stop after 1 month
                if (now - effectiveFirstSeen > ONE_MONTH) return;

                // Show again only after 3 days
                if (now - lastSeenTime < THREE_DAYS) return;

                setRelease(latestRelease);
                setVisible(true);
            } catch {
                // Silent fail: no console spam, no crash
            }
        }

        checkUpdate();
    }, []);

    function close() {
        const now = Date.now();
        localStorage.setItem("appUpdate:lastSeenTime", now.toString());
        localStorage.setItem("appUpdate:lastVersion", release!.version);
        setVisible(false);
    }

    if (!visible || !release) return null;

    return (
        <div className={styles.modal}>
            <div className={styles.header}>🚀 New app update</div>

            <p className={styles.version}>
                Version <strong>{release.version}</strong> is now available
            </p>

            <ul className={styles.changes}>
                {release.changes.slice(0, 3).map((change, i) => (
                    <li key={i}>{change}</li>
                ))}
            </ul>

            <div className={styles.actions}>
                <a href="/download">Download</a>
                <button onClick={close}>Later</button>
            </div>
        </div>
    );
}

"use client";

import { useEffect, useState } from "react";
import Accordion from "@/components/Accordion/Accordion";
import styles from "./download.module.scss";

type Release = {
    version: string;
    changes: string[];
    assets: {
        windows: string | null;
        linux: string | null;
        macos?: string | null;
    };
};

export default function DownloadPage() {
    const [releases, setReleases] = useState<Release[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const res = await fetch("/api/app/releases", {
                    cache: "no-store",
                });

                if (!res.ok) throw new Error("API error");

                const data = await res.json();
                if (data.ok) {
                    setReleases(data.releases);
                }
            } catch (err) {
                console.error("Error loading download data", err);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    if (loading) {
        return <main className={styles.download}>Loading…</main>;
    }

    const latest = releases[0];
    const olderVersions = releases.slice(1);

    const renderButton = (
        label: string,
        url: string | null,
        primary = false
    ) => {
        if (url) {
            return (
                <a
                    href={url}
                    target="_blank"
                    className={primary ? styles.btnPrimary : styles.btn}
                >
                    {label}
                </a>
            );
        }

        return (
            <span className={styles.btnDisabled}>
                {label}
                <small>Coming soon</small>
            </span>
        );
    };

    return (
        <main className={styles.download}>
            <h1>Download the latest version of PyTrip</h1>

            {/* LATEST VERSION */}
            {latest && (
                <section className={styles.versionBox}>
                    <h2>
                        Version {latest.version}
                        <span className={styles.tag}>Latest</span>
                    </h2>

                    <div className={styles.buttons}>
                        {renderButton(
                            "Download for Windows",
                            latest.assets.windows,
                            true
                        )}
                        {renderButton(
                            "Download for Linux",
                            latest.assets.linux
                        )}
                        {renderButton(
                            "Download for macOS",
                            latest.assets.macos ?? null
                        )}
                    </div>

                    <Accordion title="What's new in this version?">
                        <ul>
                            {latest.changes.map((change, i) => (
                                <li key={i}>{change}</li>
                            ))}
                        </ul>
                    </Accordion>
                </section>
            )}

            {/* INSTALL */}
            <section className={styles.installSection}>
                <h2>Installation Guides</h2>

                <Accordion title="Install PyTrip on Windows">
                    <p><strong>1. Download the Windows archive</strong></p>
                    <p>Click “Download for Windows” above.</p>
                    <p><strong>2. Extract the ZIP</strong></p>
                    <p>Right-click → Extract all.</p>
                    <p><strong>3. Run launcher.exe</strong></p>
                </Accordion>

                <Accordion title="Install PyTrip on Linux">
                    <pre className={styles.code}>
tar -xvf pytrip-{latest?.version}-linux.tar.gz
                    </pre>
                </Accordion>
            </section>

            {/* HISTORY */}
            {olderVersions.length > 0 && (
                <section className={styles.history}>
                    <h2>Version History</h2>

                    <Accordion title="Show Older Versions">
                        <ul>
                            {olderVersions.map(v => (
                                <li key={v.version}>
                                    <strong>Version {v.version}</strong>

                                    <div className={styles.historyButtons}>
                                        {renderButton(
                                            "Windows",
                                            v.assets.windows
                                        )}
                                        {renderButton(
                                            "Linux",
                                            v.assets.linux
                                        )}
                                        {renderButton(
                                            "macOS",
                                            v.assets.macos ?? null
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Accordion>
                </section>
            )}
        </main>
    );
}

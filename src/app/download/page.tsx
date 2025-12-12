"use client";

import { useEffect, useState } from "react";
import Accordion from "@/components/Accordion/Accordion";
import styles from "./download.module.scss";

type Release = {
    version: string;
    changes: string[];
};

export default function DownloadPage() {
    const [releases, setReleases] = useState<Release[]>([]);

    useEffect(() => {
        async function loadData() {
            try {
                const res = await fetch("/api/app/version", { cache: "no-store" });
                if (!res.ok) throw new Error("API error");

                const data = await res.json();
                if (data.ok) {
                    setReleases(data.releases);
                }
            } catch (err) {
                console.error("Error loading download data", err);
            }
        }

        loadData();
    }, []);

    const latest = releases[0];
    const olderVersions = releases.slice(1);

    return (
        <main className={styles.download}>
            <h1>Download the latest version of PyTrip</h1>

            {/* VERSION CARD */}
            {latest && (
                <section className={styles.versionBox}>
                    <h2>
                        Version {latest.version}{" "}
                        <span className={styles.tag}>Latest</span>
                    </h2>

                    <div className={styles.buttons}>
                        <button className={styles.btnPrimary}>
                            Download for Windows
                        </button>
                        <button className={styles.btn}>
                            Download for macOS
                        </button>
                        <button className={styles.btn}>
                            Download for Linux
                        </button>
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

            {/* INSTALL INSTRUCTIONS */}
            <section className={styles.installSection}>
                <h2>Installation Guides</h2>

                <Accordion title="Install PyTrip on Windows">
                    <p><strong>1. Download the Windows Installer (.exe)</strong></p>
                    <p>Click "Download for Windows" above.</p>

                    <p><strong>2. Double-click the installer</strong></p>
                    <p>Windows SmartScreen may warn you. Click “More Info” → “Run anyway”.</p>

                    <p><strong>3. Follow the installation wizard</strong></p>
                    <p>The setup will install PyTrip automatically.</p>
                </Accordion>

                <Accordion title="Install PyTrip on macOS">
                    <p><strong>1. Download the macOS .dmg file</strong></p>
                    <p>Click “Download for macOS”.</p>

                    <p><strong>2. Open the .dmg</strong></p>
                    <p>Drag PyTrip into Applications.</p>
                </Accordion>

                <Accordion title="Install PyTrip on Linux (Debian / Ubuntu)">
                    <pre className={styles.code}>
sudo dpkg -i pytrip_{latest?.version}_amd64.deb
                    </pre>
                </Accordion>

                <Accordion title="Install PyTrip on Linux (Arch / Manjaro)">
                    <pre className={styles.code}>
tar -xvf pytrip.tar.gz
                    </pre>
                </Accordion>
            </section>

            {/* VERSION HISTORY */}
            {olderVersions.length > 0 && (
                <section className={styles.history}>
                    <h2>Version History</h2>
                    <Accordion title="Show Older Versions">
                        <ul>
                            {olderVersions.map(v => (
                                <li key={v.version}>
                                    Version {v.version}
                                </li>
                            ))}
                        </ul>
                    </Accordion>
                </section>
            )}
        </main>
    );
}

"use client";
import Accordion from "@/components/Accordion/Accordion";
import styles from "./download.module.scss";

export default function DownloadPage() {
    return (
        <main className={styles.download}>
            <h1>Download the latest version of PyTrip</h1>

            {/* VERSION CARD */}
            <section className={styles.versionBox}>
                <h2>Version 2.1.0 <span className={styles.tag}>Latest</span></h2>
                <p className={styles.release}>Released on October 26, 2023</p>

                <div className={styles.buttons}>
                    <button className={styles.btnPrimary}>Download for Windows</button>
                    <button className={styles.btn}>Download for macOS</button>
                    <button className={styles.btn}>Download for Linux</button>
                </div>

                <Accordion title="What's new in this version?">
                    <ul>
                        <li>Added new feature for trip planning.</li>
                        <li>Fixed crash during application startup.</li>
                        <li>Improved UI responsiveness.</li>
                    </ul>
                </Accordion>
            </section>

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

                    <p><strong>4. Launch PyTrip</strong></p>
                    <p>You’ll find PyTrip in the Start Menu.</p>
                </Accordion>

                <Accordion title="Install PyTrip on macOS">
                    <p><strong>1. Download the macOS .dmg file</strong></p>
                    <p>Click “Download for macOS”.</p>

                    <p><strong>2. Open the .dmg</strong></p>
                    <p>Drag the PyTrip app into your Applications folder.</p>

                    <p><strong>3. Open the app (macOS Gatekeeper)</strong></p>
                    <p>If macOS blocks the app : Apple Menu → System Settings → Privacy → Open Anyway.</p>
                </Accordion>

                <Accordion title="Install PyTrip on Linux (Debian / Ubuntu)">
                    <p><strong>1. Download the .deb file</strong></p>
                    <p>Click “Download for Linux”.</p>

                    <p><strong>2. Install via terminal</strong></p>
                    <pre className={styles.code}>sudo dpkg -i pytrip_2.1.0_amd64.deb</pre>

                    <p><strong>3. Fix missing dependencies if needed</strong></p>
                    <pre className={styles.code}>sudo apt --fix-broken install</pre>

                    <p><strong>4. Launch PyTrip</strong></p>
                    <pre className={styles.code}>pytrip</pre>
                </Accordion>

                <Accordion title="Install PyTrip on Linux (Arch / Manjaro)">
                    <p><strong>1. Download the tar.gz</strong></p>
                    <p>Click “Download for Linux”.</p>

                    <p><strong>2. Extract files</strong></p>
                    <pre className={styles.code}>tar -xvf pytrip.tar.gz</pre>

                    <p><strong>3. Launch PyTrip</strong></p>
                    <pre className={styles.code}>./pytrip</pre>
                </Accordion>
            </section>

            {/* VERSION HISTORY */}
            <section className={styles.history}>
                <h2>Version History</h2>
                <Accordion title="Show Older Versions">
                    <p>- Version 2.0.0 – Released Aug 2023</p>
                    <p>- Version 1.9.2 – Released May 2023</p>
                </Accordion>
            </section>

            {/* FOOTER */}
            <footer className={styles.footer}>
                © 2024 PyTrip. All Rights Reserved.
            </footer>
        </main>
    );
}

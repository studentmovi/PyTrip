"use client";

import { useEffect, useState } from "react";
import Accordion from "@/components/Accordion/Accordion";
import FeatureModal from "@/components/FeatureModal/FeatureModal";
import FloatingSuggestButton from "@/components/FloatingSuggestButton/FloatingSuggestButton";
import styles from "./features.module.scss";
import Header from "@/components/Header/Header";

export default function FeaturesPage() {
    const [openModal, setOpenModal] = useState(false);
    const [version, setVersion] = useState<string | null>(null);
    const [changelog, setChangelog] = useState<string | null>(null);

    useEffect(() => {
        async function loadData() {
            try {
                const res = await fetch("/api/app/version", { cache: "no-store" });
                const data = await res.json();

                if (data.ok) {
                    setVersion(data.version);
                    setChangelog(data.changelog);
                }
            } catch (err) {
                console.error("Error loading app version/changelog", err);
            }
        }

        loadData();
    }, []);

    return (
        <>
            <main className={styles.features}>
                {/* TITLE */}
                <div className={styles.titleSection}>
                    <h1>PyTrip Features & Release History</h1>
                    <p>Explore what's new and see how PyTrip has evolved.</p>
                </div>

                {/* LATEST UPDATE DYNAMIC */}
                <section className={styles.latestUpdate}>
                    <h2>Latest Update – Version {version ?? "..."}</h2>
                    <p className={styles.releaseDate}>
                        From GitHub • App Python Version File
                    </p>

                    {changelog && (
                        <div className={styles.cards}>
                            {changelog
                                .split("\n")
                                .filter(line => line.trim() !== "")
                                .slice(0, 3)
                                .map((line, index) => (
                                    <div className={styles.card} key={index}>
                                        <h3>• {line.substring(0, 40)}...</h3>
                                        <p>{line}</p>
                                    </div>
                                ))}
                        </div>
                    )}
                </section>

                {/* RELEASE HISTORY */}
                <section className={styles.history}>
                    <h2>Release History</h2>

                    {changelog ? (
                        <Accordion title={`Version ${version} — Latest`}>
                            <ul>
                                {changelog.split("\n").map((line, i) => (
                                    <li key={i}>{line}</li>
                                ))}
                            </ul>
                        </Accordion>
                    ) : (
                        <p>Loading release notes...</p>
                    )}
                </section>

                {/* SUGGESTION BUTTON */}
                <FloatingSuggestButton onClick={() => setOpenModal(true)} />

                {/* MODAL */}
                <FeatureModal open={openModal} onClose={() => setOpenModal(false)} />
            </main>
        </>
    );
}

"use client";

import { useEffect, useState } from "react";
import Accordion from "@/components/Accordion/Accordion";
import FeatureModal from "@/components/FeatureModal/FeatureModal";
import FloatingSuggestButton from "@/components/FloatingSuggestButton/FloatingSuggestButton";
import styles from "./features.module.scss";

type Release = {
    version: string;
    changes: string[];
};

export default function FeaturesPage() {
    const [openModal, setOpenModal] = useState(false);
    const [latest, setLatest] = useState<string | null>(null);
    const [releases, setReleases] = useState<Release[]>([]);

    useEffect(() => {
        async function loadData() {
            try {
                const res = await fetch("/api/app/version", { cache: "no-store" });

                if (!res.ok) {
                    throw new Error("API error");
                }

                const data = await res.json();

                if (data.ok) {
                    setLatest(data.latest);
                    setReleases(data.releases);
                }
            } catch (err) {
                console.error("Error loading app releases", err);
            }
        }

        loadData();
    }, []);

    const latestRelease = releases[0];

    return (
        <main className={styles.features}>
            {/* TITLE */}
            <div className={styles.titleSection}>
                <h1>PyTrip Features & Release History</h1>
                <p>Explore what's new and see how PyTrip has evolved.</p>
            </div>

            {/* LATEST UPDATE */}
            {latestRelease && (
                <section className={styles.latestUpdate}>
                    <h2>Latest Update – Version {latestRelease.version}</h2>
                    <p className={styles.releaseDate}>
                        From GitHub • App Python Changelog
                    </p>

                    <div className={styles.cards}>
                        {latestRelease.changes.slice(0, 3).map((change, index) => (
                            <div className={styles.card} key={index}>
                                <h3>• {change.substring(0, 40)}...</h3>
                                <p>{change}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* RELEASE HISTORY */}
            <section className={styles.history}>
                <h2>Release History</h2>

                {releases.length > 0 ? (
                    releases.map((release) => (
                        <Accordion
                            key={release.version}
                            title={`Version ${release.version}`}
                        >
                            <ul>
                                {release.changes.map((line, i) => (
                                    <li key={i}>{line}</li>
                                ))}
                            </ul>
                        </Accordion>
                    ))
                ) : (
                    <p>Loading release notes...</p>
                )}
            </section>

            {/* SUGGESTION BUTTON */}
            <FloatingSuggestButton onClick={() => setOpenModal(true)} />

            {/* MODAL */}
            <FeatureModal open={openModal} onClose={() => setOpenModal(false)} />
        </main>
    );
}

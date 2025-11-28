"use client";

import { useState } from "react";
import Accordion from "@/components/Accordion/Accordion";
import FeatureModal from "@/components/FeatureModal/FeatureModal";
import FloatingSuggestButton from "@/components/FloatingSuggestButton/FloatingSuggestButton";
import styles from "./features.module.scss";
import Header from "@/components/Header/Header";

export default function FeaturesPage() {
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <main className={styles.features}>
                <div className={styles.titleSection}>
                    <h1>PyTrip Features & Release History</h1>
                    <p>Explore what's new and see how PyTrip has evolved.</p>
                </div>

                {/* LATEST UPDATE */}
                <section className={styles.latestUpdate}>
                    <h2>Latest Update – Version 2.1.0</h2>
                    <p className={styles.releaseDate}>Released on June 15, 2024</p>

                    <div className={styles.cards}>
                        <div className={styles.card}>
                            <h3>Automated Itinerary Planning</h3>
                            <p>Our AI generates faster, more accurate itineraries.</p>
                        </div>

                        <div className={styles.card}>
                            <h3>Real-Time Collaboration</h3>
                            <p>Coordinate trips instantly with staff.</p>
                        </div>

                        <div className={styles.card}>
                            <h3>Offline Maps & Access</h3>
                            <p>Improved caching and load times.</p>
                        </div>
                    </div>
                </section>

                {/* HISTORY */}
                <section className={styles.history}>
                    <h2>Release History</h2>

                    <Accordion title="Version 2.1.0 (Latest) — June 15, 2024">
                        <ul>
                            <li>🚀 Improved AI itinerary generator</li>
                            <li>🤝 Real-time sync improvements</li>
                            <li>📍 Offline map engine upgraded</li>
                            <li>🐛 Minor bug fixes</li>
                        </ul>
                    </Accordion>

                    <Accordion title="Version 2.0.5 — May 20, 2024">
                        <ul>
                            <li>📦 Faster loading times</li>
                            <li>🖼 Updated UI components</li>
                            <li>🔧 Fixed sync bug</li>
                        </ul>
                    </Accordion>

                    <Accordion title="Version 2.0.0 — April 1, 2024">
                        <ul>
                            <li>✨ New dashboard</li>
                            <li>🔄 Event planner redesign</li>
                            <li>📊 Better analytics</li>
                        </ul>
                    </Accordion>
                </section>

                {/* FLOATING SUGGEST BUTTON */}
                <FloatingSuggestButton onClick={() => setOpenModal(true)} />

                {/* MODAL */}
                <FeatureModal open={openModal} onClose={() => setOpenModal(false)} />
            </main>
        </>
    );
}

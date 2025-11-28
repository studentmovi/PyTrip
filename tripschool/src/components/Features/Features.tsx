"use client";
import styles from "./Features.module.scss";

export default function Features() {
    return (
        <section className={styles.features}>
            <div className={styles.badge}>Features</div>
            <h2>
                Powerful Tools for Seamless Trip <br /> Management
            </h2>
            <p className={styles.desc}>
                Dive deeper into the functionalities that make PyTrip a complete
                solution for organizing group travel.
            </p>

            <div className={styles.grid}>
                <div className={styles.card}>
                    <h4>Simplified Event Management</h4>
                    <p>Centralized management of activities & participants.</p>
                </div>

                <div className={styles.card}>
                    <h4>Automatic Price Calculation</h4>
                    <p>Calculate everything in one click.</p>
                </div>

                <div className={styles.card}>
                    <h4>Real-Time Travel Tracking</h4>
                    <p>Track progress and location instantly.</p>
                </div>
            </div>
        </section>
    );
}

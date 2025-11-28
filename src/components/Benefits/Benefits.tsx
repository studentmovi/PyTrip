"use client";
import styles from "./Benefits.module.scss";

export default function Benefits() {
    return (
        <section className={styles.benefits}>
            <h2>Core Benefits of PyTrip</h2>
            <p className={styles.desc}>
                Discover how PyTrip simplifies every aspect of your event planning,
                from initial setup to final tracking.
            </p>

            <div className={styles.grid}>
                <div className={styles.card}>
                    <h4>Gestion d'Événements Simplifiée</h4>
                    <p>Centralize all your event details easily.</p>
                </div>

                <div className={styles.card}>
                    <h4>Automatic Price Calculation</h4>
                    <p>Automatic participant cost calculation.</p>
                </div>

                <div className={styles.card}>
                    <h4>Real-Time Travel Tracking</h4>
                    <p>Follow your group in real time.</p>
                </div>
            </div>
        </section>
    );
}

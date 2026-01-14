"use client";
import styles from "./Features.module.scss";

export default function Features() {
    return (
        <section className={styles.features}>
            <div className={styles.badge}>Features</div>
            <h2>
                Powerful tools for smooth management of school trips and outings  <br />
            </h2>
            <p className={styles.desc}>
                Find out more about the features that make PyTrip a comprehensive solution
                for organising and managing the calculation of student fees.
            </p>

            <div className={styles.grid}>
                <div className={styles.card}>
                    <h4>Simplified event management</h4>
                    <p>Centralised management of activities and participants.</p>
                </div>

                <div className={styles.card}>
                    <h4>Automatic price calculation</h4>
                    <p>Calculate everything with a single click.</p>
                </div>

                <div className={styles.card}>
                    <h4>Event tracking on the calendar</h4>
                    <p>Instantly track events scheduled for the same day or month</p>
                </div>
            </div>
        </section>
    );
}

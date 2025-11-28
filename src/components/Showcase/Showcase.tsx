"use client";
import styles from "./Showcase.module.scss";

export default function Showcase() {
    return (
        <section className={styles.showcase}>
            <h2>See PyTrip in Action</h2>

            <div className={styles.grid}>
                <div className={styles.item}>
                    <img src="/assets/demo1.png" alt="" />
                    <h4>The Main Dashboard</h4>
                    <p>Complete overview at a glance.</p>
                </div>

                <div className={styles.item}>
                    <img src="/assets/demo2.png" alt="" />
                    <h4>Calculating Costs</h4>
                    <p>Manage expenses easily.</p>
                </div>

                <div className={styles.item}>
                    <img src="/assets/demo3.png" alt="" />
                    <h4>Tracking View</h4>
                    <p>Monitor your group in real time.</p>
                </div>
            </div>
        </section>
    );
}


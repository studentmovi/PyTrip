"use client";
import styles from "./Hero.module.scss";

export default function Hero() {
    return (
        <section className={styles.hero}>
            <h1>
                Organize Your Group Trips <br /> with Ease
            </h1>
            <p>
                Effortless event management, participant pricing, and tracking for
                schools and businesses.
            </p>
            <button className={styles.cta}>Télécharger Maintenant</button>

            <div className={styles.heroImg}>
                <img src="/assets/hero.png" alt="Dashboard preview" />
            </div>
        </section>
    );
}

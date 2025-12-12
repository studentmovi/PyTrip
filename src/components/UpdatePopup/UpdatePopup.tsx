"use client";

import styles from "./UpdatePopup.module.scss";

export default function UpdatePopup({ info, onClose }: any) {
    if (!info) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <h2 className={styles.title}>🚀 Nouvelle mise à jour !</h2>
                <p className={styles.version}>Version {info.version}</p>

                <ul className={styles.changelog}>
                    {info.changelog.map((item: string, i: number) => (
                        <li key={i}>• {item}</li>
                    ))}
                </ul>

                <button className={styles.close} onClick={onClose}>
                    Compris !
                </button>
            </div>
        </div>
    );
}

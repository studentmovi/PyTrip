"use client";

import styles from "./FeatureModal.module.scss";
import { useState } from "react";

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function FeatureModal({ open, onClose }: Props) {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    if (!open) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h2>Suggest a Feature</h2>
                <p className={styles.subtitle}>
                    Tell us what you would love to see added to PyTrip!
                </p>

                <form className={styles.form}>
                    <label>
                        Feature Title
                        <input
                            type="text"
                            placeholder="Short title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>

                    <label>
                        Description
                        <textarea
                            placeholder="Describe your idea..."
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </label>

                    <button type="button" className={styles.submitBtn}>
                        Send Suggestion
                    </button>
                </form>

                <button className={styles.closeBtn} onClick={onClose}>
                    ✕
                </button>
            </div>
        </div>
    );
}

"use client";

import styles from "./FloatingSuggestButton.module.scss";

interface Props {
    onClick: () => void;
}

export default function FloatingSuggestButton({ onClick }: Props) {
    return (
        <button className={styles.floatBtn} onClick={onClick}>
            <span className={styles.icon}>💡</span>
            <span className={styles.label}>Suggest here</span>
        </button>
    );
}

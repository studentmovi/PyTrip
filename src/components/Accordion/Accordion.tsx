"use client";

import { useState } from "react";
import styles from "./Accordion.module.scss";

interface Props {
    title: string;
    children: React.ReactNode;
}

export default function Accordion({ title, children }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <div className={styles.accordion}>
            <button className={styles.header} onClick={() => setOpen(!open)}>
                <span>{title}</span>
                <span className={styles.icon}>{open ? "▲" : "▼"}</span>
            </button>

            {open && <div className={styles.content}>{children}</div>}
        </div>
    );
}

import Link from "next/link";
import styles from "./thanks.module.scss";

export default function ThanksPage() {
    return (
        <main className={styles.thanks}>
            <div className={styles.box}>
                <h1>Message sent 🎉</h1>
                <p>
                    Thanks for reaching out!
                    We’ve received your message and will get back to you shortly.
                </p>

                <Link href="/" className={styles.backBtn}>
                    Back to home
                </Link>
            </div>
        </main>
    );
}

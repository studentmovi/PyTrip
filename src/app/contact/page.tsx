"use client";
import styles from "./contact.module.scss";

export default function ContactPage() {
    return (
        <>
            <main className={styles.contact}>
                <div className={styles.wrapper}>
                    <h1 className={styles.title}>Get in Touch</h1>
                    <p className={styles.subtitle}>
                        Have questions or need assistance? Fill out the form and we'll get back to you as soon as possible.
                    </p>

                    <div className={styles.formBox}>
                        <form className={styles.form}>

                            {/* NAME */}
                            <label>
                                <span>Name</span>
                                <input type="text" placeholder="Enter your name" />
                            </label>

                            {/* EMAIL */}
                            <label>
                                <span>Email Address</span>
                                <input type="email" placeholder="you@example.com" />
                            </label>

                            {/* SUBJECT */}
                            <label>
                                <span>Subject</span>
                                <input type="text" placeholder="How can we help?" />
                            </label>

                            {/* MESSAGE */}
                            <label>
                                <span>Your Message</span>
                                <textarea placeholder="Enter your message here..." />
                            </label>

                            <button type="submit" className={styles.sendBtn}>
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}

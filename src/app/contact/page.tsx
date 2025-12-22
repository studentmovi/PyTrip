"use client";
import styles from "./contact.module.scss";

export default function ContactPage() {
    return (
        <main className={styles.contact}>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>Get in Touch</h1>
                <p className={styles.subtitle}>
                    Have questions or need assistance? Fill out the form and we'll get back to you as soon as possible.
                </p>

                <div className={styles.formBox}>
                    <form
                        className={styles.form}
                        action="https://formspree.io/f/mpqayyol"
                        method="POST"
                    >
                        {/* Anti-spam honeypot (invisible) */}
                        <input
                            type="text"
                            name="_gotcha"
                            style={{ display: "none" }}
                        />

                        {/* Redirect après envoi */}
                        <input
                            type="hidden"
                            name="_redirect"
                            value="http://localhost:3000/thanks"
                        />

                        {/* NAME */}
                        <label>
                            <span>Name</span>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                required
                            />
                        </label>

                        {/* EMAIL */}
                        <label>
                            <span>Email Address</span>
                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                required
                            />
                        </label>

                        {/* SUBJECT */}
                        <label>
                            <span>Subject</span>
                            <input
                                type="text"
                                name="subject"
                                placeholder="How can we help?"
                                required
                            />
                        </label>

                        {/* MESSAGE */}
                        <label>
                            <span>Your Message</span>
                            <textarea
                                name="message"
                                placeholder="Enter your message here..."
                                required
                            />
                        </label>

                        <button type="submit" className={styles.sendBtn}>
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}

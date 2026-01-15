"use client";

import { useEffect, useState } from "react";

type ConsentValue = "granted" | "denied";

const STORAGE_KEY = "pytrip_cookie_consent_v1";

function updateConsent(analytics: ConsentValue) {
    // GTM / GA4 consent mode
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const gtag = (window as any).gtag as undefined | ((...args: any[]) => void);

    // If gtag isn't present yet, we can still push to dataLayer
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dataLayer = ((window as any).dataLayer = (window as any).dataLayer || []);

    const payload = {
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        analytics_storage: analytics,
        functionality_storage: "granted",
        security_storage: "granted",
    } as const;

    if (gtag) {
        gtag("consent", "update", payload);
    } else {
        dataLayer.push(["consent", "update", payload]);
    }
}

export default function CookieConsent() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) setVisible(true);
    }, []);

    const accept = () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ analytics: "granted", ts: Date.now() }));
        updateConsent("granted");
        setVisible(false);
    };

    const refuse = () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ analytics: "denied", ts: Date.now() }));
        updateConsent("denied");
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div
            style={{
                position: "fixed",
                left: 16,
                bottom: 16,
                zIndex: 9999,
                width: 360,
                maxWidth: "calc(100vw - 32px)",
                background: "rgba(20, 20, 20, 0.92)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 16,
                padding: 14,
                backdropFilter: "blur(10px)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                color: "white",
                fontSize: 14,
                lineHeight: 1.35,
            }}
        >
            <div style={{ fontWeight: 700, marginBottom: 6 }}>🍪 Cookies</div>
            <div style={{ opacity: 0.9 }}>
                On utilise des cookies de mesure (Google Analytics) pour comprendre l’usage du site. Tu peux accepter ou refuser, sans pression.
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 12, justifyContent: "flex-end" }}>
                <button
                    onClick={refuse}
                    style={{
                        padding: "9px 12px",
                        borderRadius: 12,
                        border: "1px solid rgba(255,255,255,0.18)",
                        background: "transparent",
                        color: "white",
                        cursor: "pointer",
                    }}
                >
                    Refuser
                </button>

                <button
                    onClick={accept}
                    style={{
                        padding: "9px 12px",
                        borderRadius: 12,
                        border: "1px solid rgba(255,255,255,0.18)",
                        background: "rgba(59,130,246,0.95)",
                        color: "white",
                        cursor: "pointer",
                        fontWeight: 700,
                    }}
                >
                    Accepter
                </button>
            </div>
        </div>
    );
}

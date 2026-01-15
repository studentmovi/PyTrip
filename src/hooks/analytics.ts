export function hasAnalyticsConsent(): boolean {
    try {
        const raw = localStorage.getItem("pytrip_cookie_consent_v1");
        if (!raw) return false;
        const parsed = JSON.parse(raw);
        return parsed?.analytics === "granted";
    } catch {
        return false;
    }
}

export function track(eventName: string, params: Record<string, unknown> = {}) {
    // Only if user consented
    if (typeof window === "undefined") return;
    if (!hasAnalyticsConsent()) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dataLayer = ((window as any).dataLayer = (window as any).dataLayer || []);
    dataLayer.push({
        event: eventName,
        ...params,
    });
}

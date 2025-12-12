import { NextResponse } from "next/server";

const APP_REPO = "studentmovi/ProjetDevOps";
const CHANGELOG_PATH = "app/changelog.json";

export async function GET() {
    try {
        // 1️⃣ Charger le changelog depuis GitHub
        const changelogRes = await fetch(
            `https://raw.githubusercontent.com/${APP_REPO}/main/${CHANGELOG_PATH}`,
            { cache: "no-store" }
        );

        if (!changelogRes.ok) {
            throw new Error("Failed to load changelog");
        }

        const rawChangelog = await changelogRes.json();

        // ✅ NORMALISATION DU FORMAT
        let changelog: any[] = [];

        if (Array.isArray(rawChangelog)) {
            changelog = rawChangelog;
        } else if (Array.isArray(rawChangelog.releases)) {
            changelog = rawChangelog.releases;
        } else {
            throw new Error("Unsupported changelog format");
        }

        // 2️⃣ Charger les releases GitHub
        const releasesRes = await fetch(
            `https://api.github.com/repos/${APP_REPO}/releases`,
            { cache: "no-store" }
        );

        if (!releasesRes.ok) {
            throw new Error("Failed to load GitHub releases");
        }

        const ghReleases = await releasesRes.json();

        // 3️⃣ Aplatir tous les assets
        const assets = ghReleases.flatMap((r: any) => r.assets ?? []);

        // 4️⃣ Associer versions ↔ assets
        const releases = changelog.map(entry => {
            const windows = assets.find((a: any) =>
                a.name === `pytrip-${entry.version}-windows.zip`
            );

            const linux = assets.find((a: any) =>
                a.name === `pytrip-${entry.version}-linux.tar.gz`
            );

            return {
                version: entry.version,
                changes: entry.changes ?? [],
                assets: {
                    windows: windows?.browser_download_url ?? null,
                    linux: linux?.browser_download_url ?? null,
                },
            };
        });

        return NextResponse.json({ ok: true, releases });
    } catch (error) {
        console.error("Release API error:", error);
        return NextResponse.json(
            { ok: false, error: String(error) },
            { status: 500 }
        );
    }
}

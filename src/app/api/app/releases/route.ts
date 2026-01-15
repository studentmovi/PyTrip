import { NextResponse } from "next/server";

const APP_REPO = "studentmovi/ProjetDevOps";
const CHANGELOG_PATH = "app/changelog.json";

type GHAsset = {
    name: string;
    browser_download_url: string;
};

function compareVersions(a: string, b: string) {
    // retourne >0 si b > a (tri décroissant)
    const pa = a.split(".").map(n => parseInt(n, 10));
    const pb = b.split(".").map(n => parseInt(n, 10));

    for (let i = 0; i < 3; i++) {
        const diff = (pb[i] ?? 0) - (pa[i] ?? 0);
        if (diff !== 0) return diff;
    }
    return 0;
}

function findAsset(
    assets: GHAsset[],
    version: string,
    platform: "windows" | "linux" | "macos"
) {
    const v = version.toLowerCase();
    const p = platform.toLowerCase();

    return assets.find(a => {
        const name = (a.name ?? "").toLowerCase();

        // doit contenir "pytrip", la version et la plateforme
        const okCore =
            name.includes("pytrip") &&
            name.includes(v) &&
            name.includes(p);

        if (!okCore) return false;

        // extensions acceptées
        if (platform === "windows") return name.endsWith(".zip") || name.endsWith(".exe");
        if (platform === "linux") return name.endsWith(".tar.gz") || name.endsWith(".zip");
        if (platform === "macos") return name.endsWith(".dmg") || name.endsWith(".zip") || name.endsWith(".tar.gz");

        return false;
    });
}

export async function GET() {
    try {
        // 1) Charger le changelog depuis GitHub (RAW)
        const changelogRes = await fetch(
            `https://raw.githubusercontent.com/${APP_REPO}/main/${CHANGELOG_PATH}`,
            { cache: "no-store" }
        );

        if (!changelogRes.ok) {
            throw new Error("Failed to load changelog");
        }

        const rawChangelog = await changelogRes.json();

        // Normalisation du format
        let changelog: any[] = [];
        if (Array.isArray(rawChangelog)) {
            changelog = rawChangelog;
        } else if (Array.isArray(rawChangelog.releases)) {
            changelog = rawChangelog.releases;
        } else {
            throw new Error("Unsupported changelog format");
        }

        // 2) Charger les releases GitHub
        const headers: Record<string, string> = {
            Accept: "application/vnd.github+json",
        };

        // Optionnel mais recommandé (évite rate limit + data incomplète)
        // Mets GITHUB_TOKEN dans ton .env (fine-grained token "Contents: Read")
        if (process.env.GITHUB_TOKEN) {
            headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
        }

        const releasesRes = await fetch(
            `https://api.github.com/repos/${APP_REPO}/releases`,
            { cache: "no-store", headers }
        );

        if (!releasesRes.ok) {
            throw new Error("Failed to load GitHub releases");
        }

        const ghReleases = await releasesRes.json();

        // 3) Aplatir tous les assets
        const assets: GHAsset[] = (ghReleases ?? [])
            .flatMap((r: any) => (r.assets ?? []) as GHAsset[])
            .filter((a: any) => a?.name && a?.browser_download_url);

        // 4) Associer versions ↔ assets
        const releases = changelog.map(entry => {
            const version = String(entry.version ?? "").trim();

            const windows = findAsset(assets, version, "windows");
            const linux = findAsset(assets, version, "linux");
            const macos = findAsset(assets, version, "macos");

            return {
                version,
                changes: entry.changes ?? [],
                assets: {
                    windows: windows?.browser_download_url ?? null,
                    linux: linux?.browser_download_url ?? null,
                    macos: macos?.browser_download_url ?? null,
                },
            };
        });

        // 5) Trier pour être sûr que la première = latest
        releases.sort((a: any, b: any) => compareVersions(a.version, b.version));

        return NextResponse.json({ ok: true, releases });
    } catch (error) {
        console.error("Release API error:", error);
        return NextResponse.json(
            { ok: false, error: String(error) },
            { status: 500 }
        );
    }
}

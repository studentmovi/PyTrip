import { NextResponse } from "next/server";

async function fetchJson(path: string) {
    const url = `https://raw.githubusercontent.com/studentmovi/ProjetDevOps/main/app/${path}`;
    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
        throw new Error(`Failed to fetch ${path}`);
    }

    return res.json();
}

export async function GET() {
    try {
        const changelog = await fetchJson("changelog.json");

        return NextResponse.json({
            ok: true,
            latest: changelog.latest,
            releases: changelog.releases
        });
    } catch (err: any) {
        return NextResponse.json(
            { ok: false, error: err.message },
            { status: 500 }
        );
    }
}

import { NextResponse } from "next/server";

async function fetchTxt(path: string) {
    const url = `https://raw.githubusercontent.com/studentmovi/ProjetDevOps/main/app/${path}`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to fetch ${path}`);
    return res.text();
}

export async function GET() {
    try {
        const version = (await fetchTxt("version.txt")).trim();
        const changelog = await fetchTxt("changelog.txt");

        return NextResponse.json({
            ok: true,
            app_version: version,
            changelog: changelog,
        });
    } catch (err: any) {
        return NextResponse.json(
            { ok: false, error: err.message },
            { status: 500 }
        );
    }
}

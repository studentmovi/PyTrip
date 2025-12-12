import { useEffect, useState } from "react";

type VersionInfo = {
    version: string;
    changelog: string[];
};

export function useUpdateChecker() {
    const [updateInfo, setUpdateInfo] = useState<VersionInfo | null>(null);

    useEffect(() => {
        async function checkVersion() {
            try {
                const res = await fetch("/version.json", { cache: "no-store" });
                const data: VersionInfo = await res.json();

                const lastSeenVersion = localStorage.getItem("pytrip_last_version");

                if (lastSeenVersion !== data.version) {
                    setUpdateInfo(data);
                    localStorage.setItem("pytrip_last_version", data.version);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération de la version:", error);
            }
        }

        checkVersion();
    }, []);

    return updateInfo;
}

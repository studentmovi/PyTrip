import type { NextConfig } from "next";

const isCI = process.env.CI === "true";

const nextConfig: NextConfig = {
    typescript: {
        ignoreBuildErrors: isCI,
    },
    eslint: {
        ignoreDuringBuilds: isCI,
    },
};

export default nextConfig;

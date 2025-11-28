"use client"; // si app router

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // next/router si pages router

const HomeRedirect: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        router.push("/home"); // redirige vers /home
    }, [router]);

    return null; // pas besoin d'afficher quoi que ce soit
};

export default HomeRedirect;

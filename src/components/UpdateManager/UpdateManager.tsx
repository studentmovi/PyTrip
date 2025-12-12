"use client";

import { useState } from "react";
import { useUpdateChecker } from "@/hooks/useUpdateChecker";
import UpdatePopup from "@/components/UpdatePopup/UpdatePopup";

export default function UpdateManager() {
    const updateInfo = useUpdateChecker();
    const [visible, setVisible] = useState(true);

    if (!updateInfo || !visible) return null;

    return <UpdatePopup info={updateInfo} onClose={() => setVisible(false)} />;
}

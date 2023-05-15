import React, { useEffect } from "react";
import DocumentControlRoutes from "./DocumentControlRoutes";
import MainLayout from "../../@core/layouts/MainLayout";
import { useSettings } from "../../@core/hooks/useSettings";
import { routes } from "./configs/Constants";

function DocumentControl() {
    const { settings, saveSettings } = useSettings();

    useEffect(() => {
        saveSettings({
            ...settings,
            activeMenu: { parent: "Document Control", children: routes },
        });
    }, []);

    return (
        <MainLayout settings={settings}>
            <DocumentControlRoutes />
        </MainLayout>
    );
}

export default DocumentControl;

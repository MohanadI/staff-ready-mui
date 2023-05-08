import React, { useEffect } from 'react';
import DocumentControlRoutes from './DocumentControlRoutes';
import MainLayout from '../../@core/layouts/MainLayout';
import { useSettings } from '../../@core/hooks/useSettings';
import Context from './configs/Context'
import { routes } from './configs/Constants';

function DocumentControl() {
    const { settings, saveSettings } = useSettings();

    useEffect(() => {
        saveSettings({...settings, activeMenu: {parent: "Document Control", children: routes}});
    }, []);

    return (
        <MainLayout
            settings={settings}
            contentHeightFixed="true"
        >
            <Context.Provider
                value={{
                    name:"DC"
                }}
            >
                <DocumentControlRoutes />
            </Context.Provider>

        </MainLayout>
    );
}

export default DocumentControl;
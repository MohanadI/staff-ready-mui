import * as React from 'react';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import DocumentControl from './modules/document-control';
import { SettingsProvider } from './@core/context/settingsContext';

export default function App() {
    return (
        <SettingsProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<h1>Home</h1>} />
                    <Route path="documentcontrol/*" element={<DocumentControl />} />
                </Routes>
            </BrowserRouter>
        </SettingsProvider>
    );
}
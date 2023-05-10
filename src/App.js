import * as React from 'react';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import DocumentControl from './modules/document-control';
import { SettingsProvider } from './@core/context/settingsContext';



export default function App() {

    const cols = [
        {
            field: 'name',
            headerName: 'Document Name',
            flex: 1,
            // renderCell: renderCell

        },
        {
            field: 'id',
            flex: 1,
            headerName: 'Classification',
            // renderCell: renderCell


        },
        {
            field: 'subject',
            headerName: 'Subject',
            flex: 1,
            labelField: 'id',

        },
        {
            field: 'description',
            headerName: 'Description',
            flex: 1,
            // renderCell: renderCell
        },
    ];


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
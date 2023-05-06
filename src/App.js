import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { useSettings } from './@core/hooks/useSettings';
import MainLayout from './@core/layouts/MainLayout';
import { navigation } from './routes';

export default function App() {
    const { settings } = useSettings()

    const router = createBrowserRouter(navigation);

    return (
        <MainLayout
            settings={settings}
            contentHeightFixed="true"
        >
            <RouterProvider router={router} />
        </MainLayout>
    );
}
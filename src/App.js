import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { useSettings } from './@core/hooks/useSettings';
import MainLayout from './@core/layouts/MainLayout';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function App() {
    const { settings } = useSettings()

    return (
        <MainLayout
            settings={settings}
            contentHeightFixed="true"
        >
            <Box>
                <Typography variant="h4" component="h1" gutterBottom>
                    Material UI Create React App example
                </Typography>
                <Copyright />
            </Box>
        </MainLayout>
    );
}
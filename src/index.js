import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';

import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import "react-perfect-scrollbar/dist/css/styles.css";
import theme from './theme';

const rootElement = document.getElementById('app');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);
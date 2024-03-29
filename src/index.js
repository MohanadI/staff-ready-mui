import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';

import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import "react-perfect-scrollbar/dist/css/styles.css";
import theme from './theme';
import axios from 'axios';
import UserContextProvider from './@core/context/UserContextProvider';

const rootElement = document.getElementById('app');
const root = ReactDOM.createRoot(rootElement);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      const baseUrl = __WICKET_BASEURL__; //MACRO from webpack.config.modular.js
      window.location = baseUrl + `/StaffReady/LoginPage`;
    } else
      return Promise.reject(error);
  });


root.render(
  <UserContextProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </UserContextProvider>

);
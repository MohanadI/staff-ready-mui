import { red, grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#ea6241",
    },
    secondary: {
      main: grey[800],
      dark: "#000000",
    },
    error: {
      main: red.A400,
    },
  }
});

export default theme;
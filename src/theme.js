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
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          borderRadius: 0,
          fontSize: "0.85rem",
          textTransform: "none",
          padding: "2px 6px",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        // Name of the slot
        root: {
          borderRadius: "0 !important",
        },
        input: {
          fontSize: "0.85rem",
          padding: "7px !important",
        },
      },
    },
    MuiTreeItem: {
      styleOverrides: {
        label: {
          fontSize: "13px",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
      },
    },
  },
});

export default theme;
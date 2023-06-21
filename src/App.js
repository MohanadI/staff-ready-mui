import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DocumentControl from "./modules/DocumentControl";
import { SettingsProvider } from "./@core/context/settingsContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function App() {
  const cols = [
    {
      field: "name",
      headerName: "Document Name",
      flex: 1,
      // renderCell: renderCell
    },
    {
      field: "id",
      flex: 1,
      headerName: "Classification",
      // renderCell: renderCell
    },
    {
      field: "subject",
      headerName: "Subject",
      flex: 1,
      labelField: "id",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      // renderCell: renderCell
    },
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <SettingsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="documentcontrol/*" element={<DocumentControl />} />
          </Routes>
        </BrowserRouter>
      </SettingsProvider>
    </LocalizationProvider>
  );
}

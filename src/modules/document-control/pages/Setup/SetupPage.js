import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";

import Context from "./Context";
import DocumentsTemplate from "./Components/Types/DocumentsTemplate";
import RevisionTemplate from "./Components/Types/RevisionTemplate";
import ClassificationFolderTemplate from "./Components/Types/ClassificationFolderTemplate";
import ClassificationTemplate from "./Components/Types/ClassificationTemplate";
import SiteTemplate from "./Components/Types/SiteTemplate";
import LocationTemplate from "./Components/Types/LocationTemplate";
import SubjectTemplate from "./Components/Types/Subject/SubjectTemplate";

function SetupPage() {
    const [setupPageData, setSetupPageData] = useState({
        activeTab: {},
        selectedNode: {
            type:"subject",
            value: "10"
        },
        isLoading: false
    });

    const handleSetupDataChange = (value,key) => {
        const tempData = setupPageData;
        tempData[key] = value;
        setSetupPageData(tempData);
    };

    const DocumentControlTemplates = {
        "subject": <SubjectTemplate />,
        "document": <DocumentsTemplate />,
        "revision": <RevisionTemplate />,
        "classification_folder": <ClassificationFolderTemplate />,
        "classification": <ClassificationTemplate />,
        "site": <SiteTemplate />,
        "location": <LocationTemplate />
    };

    const template = setupPageData.selectedNode?.type ? DocumentControlTemplates[setupPageData.selectedNode?.type] : <h1>No Template</h1>

    return (
        <Context.Provider
            value={{
                setupPageData,
                handleSetupDataChange
            }}
        >
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={9}>
                        <Typography variant="h5" gutterBottom>
                            Subject Name
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        {template}
                    </Grid>
                </Grid>
            </Box>
        </Context.Provider>
    );
}

export default SetupPage;

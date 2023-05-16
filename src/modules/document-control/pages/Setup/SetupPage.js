import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Button, Divider } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Context from "./Context";
import DocumentsTemplate from "./Components/Types/DocumentsTemplate";
import RevisionTemplate from "./Components/Types/RevisionTemplate";
import ClassificationFolderTemplate from "./Components/Types/ClassificationFolderTemplate";
import ClassificationTemplate from "./Components/Types/ClassificationTemplate";
import SiteTemplate from "./Components/Types/SiteTemplate";
import LocationTemplate from "./Components/Types/LocationTemplate";
import SubjectTemplate from "./Components/Types/Subject/SubjectTemplate";
import CustomTree from "../../../../components/CustomTree/CustomTree";
import treeData from "../../../../components/CustomTree/Data";
import FolderIcon from "@mui/icons-material/Folder";
import CustomTabs from "../../../../components/CustomTabs/CustomTabs";
import { setupTabs } from "../../configs/TabsConstant";

function SetupPage() {
  const [setupPageData, setSetupPageData] = useState({
    activeTab: {},
    selectedNode: {
      type: "subject",
      value: "10",
    },
    isLoading: false,
  });

  const handleSetupDataChange = (value, key) => {
    const tempData = setupPageData;
    tempData[key] = value;
    setSetupPageData(tempData);
  };

  const DocumentControlTemplates = {
    subject: <SubjectTemplate />,
    document: <DocumentsTemplate />,
    revision: <RevisionTemplate />,
    classification_folder: <ClassificationFolderTemplate />,
    classification: <ClassificationTemplate />,
    site: <SiteTemplate />,
    location: <LocationTemplate />,
  };

  const template = setupPageData.selectedNode?.type ? (
    DocumentControlTemplates[setupPageData.selectedNode?.type]
  ) : (
    <h1>No Template</h1>
  );

  return (
    <Context.Provider
      value={{
        setupPageData,
        handleSetupDataChange,
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3} md={3} lg={3}>
            <Box sx={{ mb: 1, width: "100%" }}>
              <CustomTabs tabsConfig={setupTabs} />
            </Box>
            <Grid item xs={12} sx={{ mb: 1.5 }}>
              <Button variant="contained" sx={{ width: "100%", padding: "6px 16px" }}>
                Add
              </Button>
            </Grid>
            <CustomTree data={treeData} tabsConfig={setupTabs} />
          </Grid>
          <Grid item xs={12} sm={9} md={9} lg={9}>
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

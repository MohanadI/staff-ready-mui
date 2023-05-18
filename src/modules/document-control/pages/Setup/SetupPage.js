import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Button, Divider, LinearProgress } from "@mui/material";

import Context from "./Context";
import DocumentsTemplate from "./Components/Types/DocumentsTemplate";
import RevisionTemplate from "./Components/Types/RevisionTemplate";
import ClassificationFolderTemplate from "./Components/Types/ClassificationFolderTemplate";
import ClassificationTemplate from "./Components/Types/ClassificationTemplate";
import SiteTemplate from "./Components/Types/SiteTemplate";
import LocationTemplate from "./Components/Types/LocationTemplate";
import SubjectTemplate from "./Components/Types/Subject/SubjectTemplate";
import CustomTree from "../../../../components/CustomTree/CustomTree";
import CustomTabs from "../../../../components/CustomTabs/CustomTabs";
import { setupTabs } from "../../configs/TabsConstant";
import withAPI from "../../../../api/core";

function SetupPage({ api }) {
  const [template, setTemplate] = useState(<h1>No Template</h1>);
  const [isLoading, setIsLoading] = useState(false);
  const [setupPageData, setSetupPageData] = useState({
    activeTab: "subject",
    selectedNode: {
      type: "subject",
      value: "10",
    },
    treeData: [],
  });

  const DocumentControlTemplates = {
    subject: <SubjectTemplate />,
    document: <DocumentsTemplate />,
    revision: <RevisionTemplate />,
    classification_folder: <ClassificationFolderTemplate />,
    classification: <ClassificationTemplate />,
    site: <SiteTemplate />,
    location: <LocationTemplate />,
  };

  useEffect(() => {
    if (setupPageData.activeTab) {
      setIsLoading(true);
      handleContextDataChange([], "treeData");
      api.get(
        "StaffReady/v10/api/tree/" + setupPageData.activeTab + "/documents",
        (results) => {
          const tempData = { ...setupPageData };
          tempData["treeData"] = results;
          tempData["selectedNode"] = results.length > 0 ? results[0] : {};
          setSetupPageData(tempData);
          setIsLoading(false);
        }
      );
    }
  }, [setupPageData.activeTab]);

  useEffect(() => {
    const tempTemplate =
      DocumentControlTemplates[setupPageData.selectedNode?.type];
    setTemplate(tempTemplate);
  }, [setupPageData.selectedNode]);

  const handleContextDataChange = (value, key) => {
    const tempData = { ...setupPageData };
    tempData[key] = value;
    setSetupPageData(tempData);
  };

  return (
    <Context.Provider
      value={{
        setupPageData,
        handleContextDataChange,
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3} md={3} lg={2}>
            <Box sx={{ mb: 1, width: "100%" }}>
              <CustomTabs tabsConfig={setupTabs} context={Context} />
            </Box>
            <Grid item xs={12} sx={{ mb: 1.5 }}>
              <Button variant="outlined" size="small" sx={{ width: "100%" }}>
                Add
              </Button>
            </Grid>
            <CustomTree
              data={setupPageData.treeData}
              isLoading={isLoading}
              tabsConfig={setupTabs}
              context={Context}
            />
          </Grid>
          <Grid item xs={12} sm={9} md={9} lg={10}>
            {isLoading ? (
              <LinearProgress />
            ) : (
              <Typography variant="h5" gutterBottom>
                {setupPageData.selectedNode?.text}
              </Typography>
            )}
            <Divider sx={{ mb: 2 }} />
            {template}
          </Grid>
        </Grid>
      </Box>
    </Context.Provider>
  );
}

export default withAPI(SetupPage);

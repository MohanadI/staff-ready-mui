import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Button, Divider, LinearProgress } from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";

import Context from "./Context";
import SubjectTemplate from "./PageTemplates/Subject/SubjectTemplate";
import DocumentsTemplate from "./PageTemplates/Documents/DocumentsTemplate";
import RevisionTemplate from "./PageTemplates/RevisionTemplate";
import ClassificationFolderTemplate from "./PageTemplates/ClassificationFolderTemplate";
import ClassificationTemplate from "./PageTemplates/ClassificationTemplate";
import SiteTemplate from "./PageTemplates/SiteTemplate";
import LocationTemplate from "./PageTemplates/LocationTemplate";
import CustomTree from "../../../../@core/components/CustomTree/CustomTree";
import CustomTabs from "../../../../@core/components/CustomTabs/CustomTabs";
import { setupTabs } from "../../configs/TabsConstant";
import withAPI from "../../../../api/core";
import useWindowSize from "../../../../@core/hooks/useWindowSize";
import TreeIcon from "../../../../@core/components/icon/TreeIcon";

function SetupPage({ api }) {
  const [template, setTemplate] = useState(<></>);
  const [isLoading, setIsLoading] = useState(false);
  const { height } = useWindowSize();
  const [setupPageData, setSetupPageData] = useState({
    activeTab: "subject",
    selectedNode: {
      type: "",
      value: null,
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
      setTemplate(<></>);
      handleContextDataChange([], "treeData");
      api.get(
        "/StaffReady/v10/api/tree/" + setupPageData.activeTab + "/documents",
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
    if (setupPageData.selectedNode?.type) {
      const tempTemplate =
        DocumentControlTemplates[setupPageData.selectedNode?.type];
      setTemplate(tempTemplate);
    }
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
          <Grid item xs={12} sm={12} md={3} lg={3}>
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
          <Grid item xs={12} sm={12} md={9} lg={9}>
            {isLoading ? (
              <LinearProgress />
            ) : (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box>
                  <TreeIcon
                    size={{ width: 30, height: 30 }}
                    type={setupPageData.selectedNode?.type}
                  />
                </Box>
                <Typography variant="h5" gutterBottom>
                  {setupPageData.selectedNode?.text}
                </Typography>
              </Box>
            )}
            <Divider sx={{ mb: 2 }} />
            <PerfectScrollbar
              style={{ height: height - 200, paddingRight: 10 }}
            >
              {template}
            </PerfectScrollbar>
          </Grid>
        </Grid>
      </Box>
    </Context.Provider>
  );
}

export default withAPI(SetupPage);

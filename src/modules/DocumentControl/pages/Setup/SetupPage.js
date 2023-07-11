import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Button, Divider, LinearProgress } from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";

import Context from "./Context";
import CustomTree from "../../../../@core/components/CustomTree/CustomTree";
import CustomTabs from "../../../../@core/components/CustomTabs/CustomTabs";
import { setupTabs } from "../../configs/TabsConstant";
import useWindowSize from "../../../../@core/hooks/useWindowSize";
import { findObjectById } from "../../../../@core/utils/GeneralUtils";
import TreeIcon from "../../../../@core/components/icon/TreeIcon";
import withAPI from "../../../../api/core";
import SubjectTemplate from "./PageTemplates/Subject/SubjectTemplate";
import DocumentsTemplate from "./PageTemplates/Documents/DocumentsTemplate";
import RevisionTemplate from "./PageTemplates/Revision/RevisionTemplate";
import ClassificationFolderTemplate from "./PageTemplates/ClassificationFolderTemplate";
import ClassificationTemplate from "./PageTemplates/ClassificationTemplate";
import SiteTemplate from "./PageTemplates/SiteTemplate";
import LocationTemplate from "./PageTemplates/LocationTemplate";
import ModalWithTabs from "../../../../@core/components/Modal/ModalWithTabs";
import DocumentAddForm from "./Components/DocumentAddForm";
import SubjectAddForm from "./Components/SubjectAddForm";
import ClassificationAddForm from "./Components/ClassificationAddForm";
import SiteAddForm from "./Components/SiteAddForm";
import LocationAddForm from "./Components/LocationAddForm";

const AddComponentTypes = {
  subject: {
    title: "Add Subject or Document",
    tabs: [
      {
        title: "Document",
        body: <DocumentAddForm />,
      },
      {
        title: "Subject",
        body: <SubjectAddForm />,
      },
    ],
  },
  classification: {
    title: "Add Classification",
    tabs: [
      {
        title: "Classification",
        body: <ClassificationAddForm />,
      },
    ],
  },
  location: {
    title: "Add Site or Location",
    tabs: [
      {
        title: "Site",
        body: <SiteAddForm />,
      },
      {
        title: "Location",
        body: <LocationAddForm />,
      },
    ],
  },
  classification_document: {
    title: "Add Classification or Document",
    tabs: [
      {
        title: "Classification",
        body: <ClassificationAddForm />,
      },
      {
        title: "Document",
        body: <DocumentAddForm />,
      },
    ],
  },
  location_document: {
    title: "Add Location or Document",
    tabs: [
      {
        title: "Document",
        body: <DocumentAddForm />,
      },
      {
        title: "Location",
        body: <LocationAddForm />,
      },
    ],
  },
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

function SetupPage({ api }) {
  const { height } = useWindowSize();

  const [state, setState] = useState({
    activeTab: "subject",
    selectedNode: {
      type: "",
      value: null,
    },
    treeData: [],
    addComponentData: AddComponentTypes.subject,
    isLoading: false,
    openAddModal: false,
    reloadTreeData: false
  });

  const handleContextDataChange = (value, key) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  useEffect(() => {
    const { activeTab } = state;

    if (activeTab || state.reloadTreeData) {
      setState((prevState) => ({
        ...prevState,
        isLoading: true,
        template: <></>,
        addComponentData: AddComponentTypes[activeTab],
      }));

      handleContextDataChange([], "treeData");

      api.get(`/StaffReady/v10/api/tree/${activeTab}/documents`, (results) => {
        setState((prevState) => ({
          ...prevState,
          treeData: results,
          selectedNode: results.length > 0 ? results[0] : {},
          isLoading: false,
        }));
      });
    }
  }, [state.activeTab, state.reloadTreeData]);

  useEffect(() => {
    const { selectedNode, activeTab } = state;
    const type = selectedNode?.type;

    if (type) {
      if (
        (type === "document" ||
          type === "classification" ||
          type === "revision") &&
        activeTab === "classification"
      ) {
        setState((prevState) => ({
          ...prevState,
          addComponentData: AddComponentTypes["classification_document"],
        }));
      }
      if (
        (type === "document" || type === "location") &&
        activeTab === "location"
      ) {
        setState((prevState) => ({
          ...prevState,
          addComponentData: AddComponentTypes["location_document"],
        }));
      }

      const tempTemplate = DocumentControlTemplates[type];
      setState((prevState) => ({
        ...prevState,
        template: tempTemplate,
      }));
    }
  }, [state.selectedNode]);

  const { template, isLoading } = state;

  return (
    <Context.Provider
      value={{
        setupPageData: state,
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
              <Button
                variant="outlined"
                size="small"
                sx={{ width: "100%" }}
                onClick={() =>
                  setState((prevState) => ({
                    ...prevState,
                    openAddModal: true,
                  }))
                }
              >
                Add
              </Button>
            </Grid>
            <ModalWithTabs
              open={state.openAddModal}
              data={state.addComponentData}
              onClose={() =>
                setState((prevState) => ({
                  ...prevState,
                  openAddModal: false,
                }))
              }
            />
            <CustomTree
              data={state.treeData}
              isLoading={isLoading}
              tabsConfig={setupTabs}
              onNodeSelect={(e, node, treeData) => {
                const match = findObjectById(treeData, node);
                handleContextDataChange(match, "selectedNode");
              }}
              context={Context}
              height={height - 250}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={9} lg={9}>
            {isLoading && <LinearProgress />}
            {!isLoading && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box>
                  <TreeIcon
                    size={{ width: 30, height: 30 }}
                    type={state.selectedNode?.type}
                  />
                </Box>
                <Typography variant="h5" gutterBottom>
                  {state.selectedNode?.text}
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

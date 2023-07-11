import React, { useEffect, useRef, useState, useContext } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import withAPI from "../../../../../api/core";
import Form from "../../../../../@core/components/Form/Form";
import AutoCompleteComp from "../../../../../@core/components/AutoCompleteComp/AutoCompleteComp";
import TreeSelection from "../../../../../@core/components/TreeSelection/TreeSelection";
import SelectWithTreeOptions from "../../../../../@core/components/TreeSelect";
import Context from "../Context";

const LoadingContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
`;

function DocumentAddForm({ api }) {
  const formRef = useRef("");
  const { handleContextDataChange } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  const save = async (data) => {
    data.locationPks = data.locationPks.map((item) => item.value);
    data.parentPk = data.parentPk.value;
    data.subjectPk = data.subjectPk.value;
    setIsLoading(true);
    await api.subject.create_document(
      data,
      () => {
        handleContextDataChange(false, "openAddModal");
        handleContextDataChange(true, "reloadTreeData");
        console.log("success");
      },
      () => {
        console.log("error");
      }
    );
    setIsLoading(false);
  };
  return (
    <>
      {isLoading ? (
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      ) : (
        <PerfectScrollbar style={{ padding: 15 }}>
          <Typography variant="h5">Document</Typography>
          <Form
            onSubmit={(formData) => {
              save(formData);
            }}
            ref={formRef}
            colPerRow={1}
            fields={[
              {
                comp: (
                  <TextField
                    id="outlined-basic"
                    label="Document Name"
                    variant="outlined"
                    size={"small"}
                  />
                ),
                name: "name",
                validation: { required: true },
              },
              {
                comp: (
                  <AutoCompleteComp
                    size={"small"}
                    mode={"lookup"}
                    api={api.common.documentTypes}
                    label={"Document Type"}
                    renderOption={(props, option) => {
                      return <Box {...props}>{option}</Box>;
                    }}
                    isOptionEqualToValue={(option, value) => {
                      return option === value;
                    }}
                  />
                ),
                name: "documentType",
                validation: { required: true },
              },
              {
                comp: (
                  <SelectWithTreeOptions
                    label={"locations"}
                    multiSelect={true}
                    url="/StaffReady/v10/api/site/tree"
                    selectableType="location"
                    displayParentSelected={true}
                    placeholder="Choose one or more"
                    loadImmediate={true}

                  />
                ),
                name: "locationPks",
                validation: { required: true },
              },
              {
                comp: (
                  <TreeSelection
                    label={"Classification"}
                    api={api.classification.get}
                    expandFirstNode={true}
                    selectionType="classification"
                  />
                ),
                name: "parentPk",
                validation: { required: true },
              },
              {
                comp: (
                  <TreeSelection
                    label={"Subject"}
                    api={api.subject.get}
                    selectionType="subject"
                    expandFirstNode={true}
                    customTopLevelData={{
                      value: "0",
                      text: "Subject (top level)",
                      type: null,
                    }}
                    validation={{ required: true }}
                  />
                ),
                name: "subjectPk",
                validation: { required: false },
              },
              {
                comp: <h2>Time Between Reviews</h2>,
                comp: (
                  <AutoCompleteComp
                    size={"small"}
                    mode={"lookup"}
                    api={api.common.frequencies}
                    label={"Time Between Reviews"}
                    renderOption={(props, option) => {
                      return <Box {...props}>{option}</Box>;
                    }}
                    isOptionEqualToValue={(option, value) => {
                      return option === value;
                    }}
                  />
                ),
                name: "reviewFrequency",
                validation: { required: true },
              },
              {
                comp: (
                  <TextField
                    size={"small"}
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    rows={4}
                    defaultValue="Default Value"
                  />
                ),
                name: "description",
                validation: { required: false },
              },
            ]}
            actions={[
              {
                comp: (
                  <Button type="submit" size="small" variant="outlined">
                    Save Changes
                  </Button>
                ),
                type: "submit",
              },
            ]}
          />
        </PerfectScrollbar>
      )}
    </>
  );
}

export default withAPI(DocumentAddForm);

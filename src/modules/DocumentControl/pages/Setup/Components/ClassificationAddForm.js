import React, { useContext, useEffect, useRef, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import withAPI from "../../../../../api/core";
import Form from "../../../../../@core/components/Form/Form";
import Context from "../Context";
import TreeSelection from "../../../../../@core/components/TreeSelection/TreeSelection";
import { isEmpty } from "lodash";

const LoadingContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
`;

/*
department
:
{}
departmentPk
:
null
description
:
"asdasd"
id
:
"fsfsd"
name
:
"sdfsdfsdf"
parentPk
:
-2147481969

*/

function ClassificationAddForm({ api }) {
  const formRef = useRef("");
  const { setupPageData } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const [fields, setFields] = useState([
    {
      comp: (
        <TextField
          id="outlined-basic"
          label="Short Id"
          variant="outlined"
          size={"small"}
        />
      ),
      name: "id",
      validation: { required: true },
    },
    {
      comp: (
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          size={"small"}
        />
      ),
      name: "name",
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
  ]);

  useEffect(() => {
    loadParent();
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const loadParent = () => {
    const currentNode = setupPageData?.selectedNode.value;
    if (!currentNode) return;
    api.classification.get_parent(
      currentNode,
      (result) => {
        if (!isEmpty(result.parent) && result.parent?.id !== "Documents") {
          setFields([
            ...fields,
            {
              comp: (
                <TreeSelection
                  label={"Department"}
                  api={api.classification.department}
                  selectionType="department"
                  expandFirstNode={true}
                  customTopLevelData={{
                    value: "0",
                    text: "Department (top level)",
                    type: null,
                  }}
                  validation={{ required: false }}
                />
              ),
              name: "departmentPk",
              validation: { required: false },
            },
          ]);
        }
      },
      (error) => {
        console.log("Error", error);
      }
    );
  };

  return (
    <>
      {isLoading ? (
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      ) : (
        <PerfectScrollbar style={{ padding: 15 }}>
          <Typography variant="h5">Classification</Typography>
          <Form
            onSubmit={(formData) => {
              console.log(formData);
            }}
            ref={formRef}
            colPerRow={1}
            fields={fields}
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

export default withAPI(ClassificationAddForm);

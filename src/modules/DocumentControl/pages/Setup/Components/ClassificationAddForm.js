import React, { useContext, useEffect, useRef, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
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
departmentPk
description
id
name
parentPk
*/

function ClassificationAddForm({ api }) {
  const formRef = useRef("");
  const { setupPageData, handleContextDataChange } = useContext(Context);
  const [preIdentifier, setPreIdentifier] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [parent, setParent] = useState({});
  const [showDepartment, setShowDepartment] = useState(false);

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
    setPreIdentifier(setupPageData?.selectedNode.text + " .");
    api.classification.get_parent(
      currentNode,
      (result) => {
        setParent(result);
        if (!isEmpty(result.parent) && result.parent?.id !== "Documents") {
          setShowDepartment(true);
        } else {
          setShowDepartment(false);
        }
      },
      (error) => {
        console.log("Error", error);
      }
    );
  };

  const save = async (data) => {
    setIsLoading(true);
    data.parentPk = parent.improvePk;
    data.departmentPk = data.department?.value;
    await api.subject.create_classification(
      data,
      () => {
        console.log("success");
        setTimeout(function () {
          handleContextDataChange(false, "openAddModal");
          handleContextDataChange(true, "reloadTreeData");
        }, 2000);
      },
      () => {
        console.log("error");
      }
    );
    setIsLoading(false);
  };

  const fields = [
    {
      comp: (
        <TextField
          id="outlined-basic"
          label="Short Id"
          variant="outlined"
          size={"small"}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ fontSize: 13 }}>
                {preIdentifier}
              </InputAdornment>
            ),
          }}
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
        />
      ),
      name: "description",
      validation: { required: false },
    },
  ];
  if (showDepartment) {
    fields.push({
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
      name: "department",
      validation: { required: false },
    });
  }
  return (
    <>
      {isLoading ? (
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      ) : (
        <PerfectScrollbar style={{ padding: 5 }}>
          <Typography variant="h5" sx={{ marginBottom: 1 }}>
            Classification
          </Typography>
          <Form
            onSubmit={(formData) => {
              save(formData);
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

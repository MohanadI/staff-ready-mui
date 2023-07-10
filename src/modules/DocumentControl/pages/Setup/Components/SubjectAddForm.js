import React, { useContext, useEffect, useRef, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import withAPI from "../../../../../api/core";
import Form from "../../../../../@core/components/Form/Form";
import TreeSelection from "../../../../../@core/components/TreeSelection/TreeSelection";
import Context from "../Context";

const LoadingContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
`;

function SubjectAddForm({ api }) {
  const formRef = useRef("");
  const { setupPageData } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const [subjectPk, setSubjectPk] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setSubjectPk(setupPageData?.selectedNode.value);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const save = async (data) => {
    data.parentPk = data.parentPk?.value;
    setIsLoading(true);
    await api.subject.create_subject(
      data,
      () => {
        console.log("success");
      },
      () => {
        console.log("error");
      },
      {
        auditContextJson: JSON.stringify({
          auditContextClass:
            "com.maplewoodsoftware.colorbar.documentcontrol.subject.SubjectColorBar",
          navigationLabelId: "SubjectPk",
          navigationPk: subjectPk,
        }),
      }
    );
    setIsLoading(false);
  };

  const auditContext = () => {
    return {
      auditContextClass:
        "com.maplewoodsoftware.colorbar.documentcontrol.subject.SubjectColorBar",
      navigationLabelId: "SubjectPk",
      navigationPk: subjectPk,
    };
  };

  return (
    <>
      {isLoading ? (
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      ) : (
        <PerfectScrollbar style={{ padding: 15 }}>
          <Typography variant="h5">Subject</Typography>
          <Form
            onSubmit={(formData) => {
              save(formData);
            }}
            ref={formRef}
            colPerRow={1}
            fields={[
              {
                comp: (
                  <TreeSelection
                    label={"Within"}
                    api={api.subject.get}
                    selectionType="subject"
                    expandFirstNode={true}
                    customTopLevelData={{
                      value: "0",
                      text: "Subject (top level)",
                      type: null,
                    }}
                    validation={{ required: false }}
                  />
                ),
                name: "parentPk",
                validation: { required: false },
              },
              {
                comp: (
                  <TextField
                    id="outlined-basic"
                    label="Subject Id"
                    variant="outlined"
                    size={"small"}
                  />
                ),
                name: "id",
                validation: { required: true },
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

export default withAPI(SubjectAddForm);

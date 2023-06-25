import React, { useEffect, useRef, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import withAPI from "../../../../../api/core";
import Form from "../../../../../@core/components/Form/Form";
import TreeSelection from "../../../../../@core/components/TreeSelection/TreeSelection";

const LoadingContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
`;

function LocationAddForm({ api }) {
  const formRef = useRef("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      ) : (
        <PerfectScrollbar style={{ padding: 15 }}>
          <Typography variant="h5">Location</Typography>
          <Form
            onSubmit={(formData) => {
              console.log(formData);
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
                name: "Subject",
                validation: { required: false },
              },
              {
                comp: (
                  <TextField
                    id="outlined-basic"
                    label="Location"
                    variant="outlined"
                    size={"small"}
                  />
                ),
                name: "Location",
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

export default withAPI(LocationAddForm);

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

const LoadingContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
`;

function ClassificationAddForm({ api }) {
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
          <Typography variant="h5">Classification</Typography>
          <Form
            onSubmit={(formData) => {
              console.log(formData);
            }}
            ref={formRef}
            colPerRow={1}
            fields={[
              {
                comp: (
                  <TextField
                    id="outlined-basic"
                    label="Short Id"
                    variant="outlined"
                    size={"small"}
                  />
                ),
                name: "ShortId",
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
                name: "Name",
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
                name: "Description",
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

export default withAPI(ClassificationAddForm);

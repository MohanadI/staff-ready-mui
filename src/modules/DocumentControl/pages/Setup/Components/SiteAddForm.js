import React, { useEffect, useRef, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
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

function SiteAddForm({ api }) {
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
          <Typography variant="h5">Site</Typography>
          <Form
            onSubmit={(formData) => {
              console.log(formData);
            }}
            ref={formRef}
            colPerRow={2}
            fields={[
              {
                comp: (
                  <TextField
                    id="outlined-basic"
                    label="Site"
                    variant="outlined"
                    size={"small"}
                  />
                ),
                name: "DocumentName",
                validation: { required: true },
              },
              {
                comp: (
                  <TextField
                    id="outlined-basic"
                    label="City"
                    variant="outlined"
                    size={"small"}
                  />
                ),
                name: "City",
                validation: { required: true },
              },
              {
                comp: (
                  <TextField
                    id="outlined-basic"
                    label="Hours"
                    variant="outlined"
                    size={"small"}
                  />
                ),
                name: "Hours",
                validation: { required: false },
              },
              {
                comp: (
                  <TextField
                    id="outlined-basic"
                    label="Suite/Attn"
                    variant="outlined"
                    size={"small"}
                  />
                ),
                name: "Suite",
                validation: { required: false },
              },
              {
                comp: (
                  <TextField
                    id="outlined-basic"
                    label="Postal Code"
                    variant="outlined"
                    size={"small"}
                  />
                ),
                name: "PostalCode",
                validation: { required: true },
              },
              {
                comp: (
                  <TextField
                    id="outlined-basic"
                    label="Zip+"
                    variant="outlined"
                    size={"small"}
                  />
                ),
                name: "Zip",
                validation: { required: false },
              },
              {
                comp: (
                  <TextField
                    id="outlined-basic"
                    label="Address"
                    variant="outlined"
                    size={"small"}
                  />
                ),
                name: "Address",
                validation: { required: true },
              },
              {
                comp: (
                  <TextField
                    id="outlined-basic"
                    label="State/Province"
                    variant="outlined"
                    size={"small"}
                  />
                ),
                name: "State",
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

export default withAPI(SiteAddForm);

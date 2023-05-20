import React, { useEffect, useState, Fragment } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import withAPI from "../../../../../../../api/core";
import HeaderIcons from "../HeaderIcons";
import EmptyStatus from "../Components/EmptyStatus";
import DocumentHistory from "../Components/DocumentHistory";

function DocumentStatus({ api, node }) {
  const [data, setData] = useState({});
  const [history, setHistory] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    api.get(`/StaffReady/v10/api/document/${node.value}/summary`, (results) => {
      setIsLoading(false);
      setData(results);
    });
  }, [node]);

  const renderStatus = () => {
    if (data?.statusId === "Empty") {
      return (
        <EmptyStatus
          document={data}
          //type={props.type}
          history={history}
        />
      );
    } else if (
      data?.statusId === "Revision" ||
      data?.statusId === "Full" ||
      data?.latestRevision?.statusId === "Re Approval"
    ) {
      return <EmptyStatus />;
    } else if (
      data?.statusId === "Publish" &&
      data?.latestRevision?.statusId !== "Re Approval"
    ) {
      return <EmptyStatus />;
    }
  };

  return (
    <Fragment>
      <Box sx={{ textAlign: "center" }}>
        <HeaderIcons />
      </Box>
      <Box>
        {isLoading && (
          <div style={{ textAlign: "center", marginTop: 15 }}>
            <CircularProgress size={25} />
          </div>
        )}
        {!isLoading && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4}>
              {renderStatus()}
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <DocumentHistory />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography> Available Actions</Typography>
            </Grid>
          </Grid>
        )}
      </Box>
    </Fragment>
  );
}

export default withAPI(DocumentStatus);

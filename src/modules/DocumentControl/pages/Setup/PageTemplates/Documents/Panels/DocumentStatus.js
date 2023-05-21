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
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const [history, setHistory] = useState({});
  const [documentType, setDocumentType] = useState(undefined);

  useEffect(() => {
    setIsLoading(true);
    api.get(`/StaffReady/v10/api/document/${node.value}/summary`, (results) => {
      setIsLoading(false);
      setData(results);
    });
    api.get(`/StaffReady/v10/api/document/${node.value}/type`, (results) => {
      setDocumentType(results);
    });
    api.get(
      `/StaffReady/v10/api/document/${node.value}/status/history`,
      (results) => {
        setHistory(results.reverse());
      }
    );
  }, [node]);

  const renderStatus = () => {
    if (data?.statusId === "Empty") {
      return (
        <EmptyStatus document={data} type={documentType} history={history} />
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
      {isLoading && (
        <Box>
          <div style={{ textAlign: "center", marginTop: 15 }}>
            <CircularProgress size={25} />
          </div>
        </Box>
      )}
      {!isLoading && (
        <Box>
          {renderStatus()}
          <DocumentHistory />
        </Box>
      )}
    </Fragment>
  );
}

export default withAPI(DocumentStatus);

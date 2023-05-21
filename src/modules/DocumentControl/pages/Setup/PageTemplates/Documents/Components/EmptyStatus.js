import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";

import withAPI from "../../../../../../../api/core";
import StatusIcon from "../../../../../../../@core/components/icon/StatusIcon";
import { LinkOff, LinkRounded, UploadFile } from "@mui/icons-material";
import Skeleton from "@mui/material/Skeleton";

const StyledList = styled(List)(({ theme }) => ({
  background: "#fbfbfb6b",
  borderTop: "1px solid #333",
  ".MuiGrid-root": {
    background: "#f5f5f594",
    marginTop: "10px",
    padding: "5px 5px 0 5px",
    borderTopRightRadius: "5px",
    borderTopLeftRadius: "5px",
  },
  ".MuiListItem-root": {
    padding: 5,
    borderBottom: "1px solid #f2f2f2",
    ".MuiListItemIcon-root": {
      minWidth: 30,
    },
  },
}));

function EmptyStatus({ api, document, history, type }) {
  const [isLoading, setIsLoading] = useState(false);
  const [emptyStatus, setEmptyStatus] = useState({});

  useEffect(() => {
    setIsLoading(true);
    api.get(
      `/StaffReady/v10/api/document/${document?.improvePk}/status/empty`,
      (results) => {
        setIsLoading(false);
        setEmptyStatus(results);
      }
    );
  }, []);

  const getStatus = () => {
    if (history?.length > 0) return history[0].status;
    return "";
  };

  const {
    hasExam,
    hasFile,
    hasOwner,
    hasReviewers,
    useLocationReviewTeams,
    useSiteApprover,
    hasFinalReviewers,
    hasApprovers,
    hasAcknowledgmentList,
    hasLocations,
  } = emptyStatus;

  const EmptyStatusList = [
    {
      flag: hasExam,
      icon_flag: hasExam,
      ok: "A StaffReady Exam Has Been Attached",
      not_ok: "No Exam Attached",
    },
    {
      flag: hasFile,
      icon_flag: hasFile,
      ok: "File Has Been Uploaded",
      not_ok: "No File Uploaded",
    },
    {
      flag: hasOwner,
      icon_flag: hasOwner,
      ok: "Has Document Owner",
      not_ok: "No Document Owner Set",
    },
    {
      flag: hasReviewers,
      icon_flag: hasReviewers,
      ok: "Has Reviewers",
      not_ok: "No Reviewers Set",
    },
    {
      flag: hasFinalReviewers,
      icon_flag: hasFinalReviewers,
      ok: "Has Final Reviewers",
      not_ok: "No Final Reviewers Set",
    },
    {
      flag: hasApprovers,
      icon_flag: hasApprovers,
      ok: "Has Approvers",
      not_ok: "No Approvers Set",
    },
    {
      flag: type === "File or URL",
      icon_flag: hasAcknowledgmentList,
      ok: "Has Acknowledgement List",
      not_ok: "No Acknowledgement List Set",
    },
    {
      flag: hasLocations,
      icon_flag: hasLocations,
      ok: (
        <>
          <em>(optional)</em> Has Locations
        </>
      ),
      not_ok: (
        <>
          <em>(optional)</em> No Locations Set
        </>
      ),
    },
    {
      flag: useSiteApprover,
      icon_flag: useSiteApprover,
      ok: (
        <>
          <em>(optional)</em> Use Site Approvers: On
        </>
      ),
      not_ok: (
        <>
          <em>(optional)</em> Use Site Approvers: Off
        </>
      ),
    },
    {
      flag: useLocationReviewTeams,
      icon_flag: useLocationReviewTeams,
      ok: (
        <>
          <em>(optional)</em> Use Location Review Teams: On
        </>
      ),
      not_ok: (
        <>
          <em>(optional)</em> Use Location Review Teams: Off
        </>
      ),
    },
  ];
  return (
    <>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="h6">Document Preparation</Typography>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: "end" }}>
          {type === "File or URL" && getStatus() === "setup" && (
            <>
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<UploadFile />}
                sx={{ marginRight: 1, fontSize: "12px" }}
              >
                Content for Review
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<UploadFile />}
                sx={{ fontSize: "12px" }}
              >
                Pre-Approved Content
              </Button>
            </>
          )}
          {type === "StaffReady Competency Exam" && getStatus() === "setup" && (
            <>
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<UploadFile />}
                sx={{ marginRight: 1, fontSize: "12px" }}
              >
                Create New Exam
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<LinkOff />}
                sx={{ fontSize: "12px" }}
              >
                Link Pre-Approved Exam
              </Button>
            </>
          )}
          {getStatus() === "content-available" && (
            <>
              {type === "StaffReady Competency Exam" && (
                <Button
                  variant="text"
                  color="inherit"
                  startIcon={<LinkRounded />}
                  sx={{ marginRight: 1, fontSize: "12px" }}
                >
                  Add Content to Exam
                </Button>
              )}
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<LinkOff />}
                sx={{ fontSize: "12px" }}
              >
                Start Draft
              </Button>

              {document?.versionNN && (
                <Button
                  variant="outlined"
                  color="inherit"
                  startIcon={<LinkOff />}
                  sx={{ fontSize: "12px" }}
                >
                  Bypass Review
                </Button>
              )}
            </>
          )}
        </Grid>
      </Grid>
      <StyledList dense={true}>
        {EmptyStatusList.map((status) => {
          if (status.flag) {
            if (isLoading) {
              return <Skeleton />;
            } else {
              return (
                <ListItem>
                  <ListItemIcon>
                    <StatusIcon noApi={true} statusKey={status.icon_flag} />
                  </ListItemIcon>
                  <ListItemText
                    primary={status.flag === "OK" ? status.ok : status.not_ok}
                  />
                </ListItem>
              );
            }
          }
        })}
      </StyledList>
    </>
  );
}

export default withAPI(EmptyStatus);

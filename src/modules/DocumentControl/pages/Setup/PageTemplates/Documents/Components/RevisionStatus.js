import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import Button from "@mui/material/Button";
import TimelineDot from "@mui/lab/TimelineDot";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import Typography from "@mui/material/Typography";

import withAPI from "../../../../../../../api/core";
import InstructionsModal from "./InstructionsModal";

function RevisionStatus({ api, history, document }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [nextStep, setNextStep] = React.useState("reviewers");
  const [emptyStatus, setEmptyStatus] = React.useState({});
  const [showPublishDocumentModal, setShowPublishDocumentModal] =
    React.useState(false);
  const [showInstructionsModal, setShowInstructionsModal] =
    React.useState(false);

  React.useEffect(() => {
    console.log(document);
    loadStatus();
  }, [document]);

  const loadStatus = () => {
    setIsLoading(true);
    api.get(
      `/StaffReady/v10/api/document/${document.isDocumentPk}/status/empty`,
      (results) => {
        setIsLoading(false);
        setEmptyStatus(results.data);
      }
    );
  };

  const getLatestHistory = () => {
    if (history?.length > 0) return history[0];
  };

  const ownerStep = getLatestHistory()?.participant == "owner";
  const reviewerStep = getLatestHistory()?.participant == "reviewer";
  const finalReviewerStep = getLatestHistory()?.participant == "finalreviewer";
  const approverStep = getLatestHistory()?.participant == "approver";
  const publishStep =
    history.length &&
    history?.some(
      (i) => i.participant === "owner" && i.status === "Approved"
    ) &&
    !(document?.latestRevision?.statusId === "Re Approval");

  const Steps = [
    {
      key: "document_setup",
      title: "Document Setup",
      icon: <TaskOutlinedIcon />,
      status: "done",
      action: <></>,
      condition: true,
    },
    {
      key: "draft",
      title: "Draft",
      icon: <NoteAddOutlinedIcon />,
      status: "in_progress",
      action: (
        <Button
          size="small"
          variant="outlined"
          onClick={() => setShowInstructionsModal(true)}
        >
          Edit Instructions/Content
        </Button>
      ),
      condition: ownerStep,
    },
    {
      key: "review",
      title: "Review",
      icon: <DescriptionOutlinedIcon />,
      status: reviewerStep
        ? "warning"
        : finalReviewerStep
        ? "done"
        : "not_active",
      action: ownerStep ? (
        <Button
          size="small"
          disabled={!emptyStatus || emptyStatus?.hasReviewers !== "OK"}
          variant="outlined"
          onClick={() => setNextStep("reviewers")}
        >
          Start
        </Button>
      ) : (
        <></>
      ),
      condition: true,
    },
    {
      key: "final_review",
      title: "Final Review",
      icon: <DescriptionOutlinedIcon />,
      status: finalReviewerStep ? "warning" : "not_active",
      action: ownerStep ? (
        <Button
          size="small"
          disabled={!emptyStatus || emptyStatus?.hasFinalReviewers !== "OK"}
          variant="outlined"
          onClick={() => setNextStep("finalreviewers")}
        >
          Start
        </Button>
      ) : (
        <></>
      ),
      condition: true,
    },
    {
      key: "approval",
      title: "Approval",
      icon: <DescriptionOutlinedIcon />,
      status: approverStep ? "warning" : "not_active",
      action: ownerStep ? (
        <Button
          size="small"
          variant="outlined"
          onClick={() => setNextStep("finalreviewers")}
        >
          Request Approval
        </Button>
      ) : (
        <></>
      ),
      condition: true,
    },
    {
      key: "published",
      title: "Published",
      icon: <DescriptionOutlinedIcon />,
      status: publishStep ? "info" : "not_active", // in_progress, not_active
      action: publishStep ? (
        <Button
          size="small"
          variant="outlined"
          onClick={() => setShowPublishDocumentModal(true)}
        >
          Publish Options
        </Button>
      ) : (
        <></>
      ),
      condition: true,
    },
  ];
  return (
    <>
      <InstructionsModal open={showInstructionsModal} setCallback={(value) => {
          console.log(value);
          setShowInstructionsModal(false);
        }}/>
      <Timeline position="alternate" sx={{ border: "1px solid #f2f2f2" }}>
        {Steps.map((item) => {
          if (item.condition) {
            return (
              <TimelineItem key={item.key}>
                <TimelineSeparator>
                  <TimelineConnector />
                  <TimelineDot
                    color={
                      item.status === "done"
                        ? "success"
                        : item.status === "in_progress"
                        ? "primary"
                        : item.status === "warning"
                        ? "warning"
                        : item.status === "info"
                        ? "info"
                        : "grey"
                    }
                  >
                    {item.icon}
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: "20px", px: 2 }}>
                  <Typography
                    sx={{ fontSize: "1rem" }}
                    variant="h6"
                    component="span"
                  >
                    {item.title}
                  </Typography>
                  <Typography>{item.action}</Typography>
                </TimelineContent>
              </TimelineItem>
            );
          }
        })}
      </Timeline>
    </>
  );
}

export default withAPI(RevisionStatus);

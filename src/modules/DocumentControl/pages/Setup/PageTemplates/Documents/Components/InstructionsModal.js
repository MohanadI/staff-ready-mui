import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Grid from "@mui/material/Grid";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import withAPI from "../../../../../../../api/core";
import VerticalTabs from "../../../../../../../@core/components/VerticalTabs";
import UploadZone from "../../../../../../../@core/components/UploadZone";
import EditorComponent from "../../../../../../../@core/components/Editor";
import {
  ExamLink,
  getContentLink,
} from "../../../../../../../@core/hooks/getContentLink";

const InstructionsModal = ({
  api,
  open,
  setCallback,
  history,
  type,
  document,
  statusOverview,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [nextStep, setNextStep] = React.useState("");

  const handleChange = (event) => {
    setNextStep(event.target.value);
  };
  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const getLatestLog = () => {
    if (history?.length > 0) return history[0];
    return {};
  };

  const tabs = [
    {
      key: "add_instructions",
      label: "Add Instructions",
      body: (
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography variant="h6">Upload Content</Typography>
            {type === "File or URL" && (
              <UploadZone
                uploadInstructions="Upload a document to be sent out for Review/Final Review/Approval."
                actions={
                  getLatestLog() && (
                    <>
                      {getContentLink(getLatestLog().document, true)}
                      <Button
                        startIcon={<ChangeCircleIcon />}
                        variant="outlined"
                      >
                        Replace Document
                      </Button>
                    </>
                  )
                }
              />
            )}
            {type === "StaffReady Competency Exam" && (
              <UploadZone
                uploadInstructions="Update the StaffReady Competency Document to be sent to the next step."
                actions={
                  getLatestLog() &&
                  ExamLink(getLatestLog()?.isDocumentPk, true, "Edit Document")
                }
              />
            )}
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6">
              Set Target Dates <small>(optional)</small>
            </Typography>
            <Typography variant="body2">Publish Target Date</Typography>
            <DatePicker />
            <Typography variant="body2">Review Target Date</Typography>
            <DatePicker />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Add Instructions</Typography>
            <EditorComponent />
          </Grid>
        </Grid>
      ),
    },
    {
      key: "complete_options",
      label: "Complete Options",
      body: (
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h6">Document Name</Typography>
            {document.name} ({document.id})
            <Typography variant="body1"></Typography>
            <FormControl sx={{ marginTop: 2 }}>
              <FormLabel id="demo-radio-buttons-group-label">
                When this Document has been fully prepared, choose an option
                below to send it to the next step:
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={nextStep}
                onChange={handleChange}
              >
                <FormControlLabel
                  disabled={
                    !statusOverview || statusOverview?.hasReviewers !== "OK"
                  }
                  value="reviewers"
                  control={<Radio />}
                  label="Send to Reviewers"
                />
                <FormControlLabel
                  disabled={
                    !statusOverview ||
                    statusOverview?.hasFinalReviewers !== "OK"
                  }
                  value="finalreviewers"
                  control={<Radio />}
                  label="Send to Final Reviewers"
                />
                <FormControlLabel
                  value="approvers"
                  control={<Radio />}
                  label="Request Approval"
                />
              </RadioGroup>
              <Button
                sx={{ width: "150px" }}
                variant="outlined"
                onClick={() => console.log("next")}
              >
                Send to Next Step
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      ),
    },
  ];

  return (
    <Dialog
      onClose={() => {
        setCallback(false);
      }}
      open={isOpen}
      fullWidth={true}
      maxWidth={"md"}
    >
      <DialogTitle>Add Review Instructions</DialogTitle>
      <DialogContent>
        <VerticalTabs title="Instructions Tabs" tabs={tabs} />
      </DialogContent>
    </Dialog>
  );
};

export default withAPI(InstructionsModal);

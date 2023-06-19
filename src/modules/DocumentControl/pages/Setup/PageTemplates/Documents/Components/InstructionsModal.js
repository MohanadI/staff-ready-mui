import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Grid from "@mui/material/Grid";
import axios from "axios";

import withAPI from "../../../../../../../api/core";
import VerticalTabs from "../../../../../../../@core/components/VerticalTabs";
import UploadZone from "../../../../../../../@core/components/UploadZone";
import EditorComponent from "../../../../../../../@core/components/Editor";

const InstructionsModal = ({ api, open, setCallback }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const tabs = [
    {
      key: "add_instructions",
      label: "Add Instructions",
      body: (
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography variant="h6">Upload Content</Typography>
            <UploadZone uploadInstructions="Upload a document to be sent out for Review/Final Review/Approval." />
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
      body: <>Complete Options</>,
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

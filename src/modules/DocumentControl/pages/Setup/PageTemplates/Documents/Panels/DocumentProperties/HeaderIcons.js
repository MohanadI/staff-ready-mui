import React, { useState, Fragment } from "react";
import {
  Box,
  IconButton as MuiIconButton,
  Popover,
  Tooltip,
} from "@mui/material";
import { Feedback, Help, VerifiedUser } from "@mui/icons-material";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import FeedbackModal from "../../../../../../../../@core/components/feedback-modal";

// Material UI imports For Audit Dialog:
import {
  TextField, 
  Dialog, 
  DialogContent, 
  DialogTitle, 
  DialogContentText
} from '@mui/material';

import { AuditDialog } from "./AuditDialog";

const IconButton = styled((props) => (
  <MuiIconButton color="default" {...props} />
))(() => ({
  backgroundColor: "#f8f8f8",
  marginRight: 10,
}));

export default function HeaderIcons() {
  const [anchorEl, setAnchorEl] = useState(null)
  const [openFeedback, setOpenFeedback] = useState(false)
  const [openAudit, setOpenAudit] = useState(false)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleCloseDialog = () => {
    setOpenAudit((prevOpenAudit) => !prevOpenAudit)
  }

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Fragment>
      <IconButton onClick={() => setOpenFeedback(true)}>
        <Tooltip title="Feedback">
          <Feedback />
        </Tooltip>
      </IconButton>
      {/* Start of help Icon and it's functionality */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Box sx={{ p: 2, maxWidth: "400px" }}>
          <Typography gutterBottom variant="h6">
            Document Properties
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "13px" }}>
            This color bar allows admins to edit document Properties including name, document subject, owner, classification, URL, interval between reviews, access level, description, keyword, or attachment.
          </Typography>
        </Box>
      </Popover>
      <IconButton
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      >
        <Tooltip title="Help">
          <Help />
        </Tooltip>
      </IconButton>
      {/* End of Help icon */}
      {/* Start of Audit Icon and it's functionality */}
      <IconButton onClick={handleCloseDialog}>
        <Tooltip title="Audit">
          <VerifiedUser />
        </Tooltip>
      </IconButton>
      {/* End of Audit Icon */}
      <FeedbackModal
        open={openFeedback}
        setCallback={(value) => {
          setOpenFeedback(false);
        }}
      />
      <AuditDialog isOpen={openAudit} onClose={handleCloseDialog} />
    </Fragment>
  );
}

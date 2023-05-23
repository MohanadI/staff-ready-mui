import React, { useState, Fragment } from "react";
import {
  IconButton as MuiIconButton,
  Popover,
  Tooltip,
} from "@mui/material";
import { Feedback, Help, VerifiedUser } from "@mui/icons-material";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FeedbackModal from "../../../../../../@core/components/feedback-modal";

const IconButton = styled((props) => (
  <MuiIconButton color="default" {...props} />
))(() => ({
  backgroundColor: "#f8f8f8",
  marginRight: 10,
}));

export default function HeaderIcons() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openFeedback, setOpenFeedback] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Fragment>
      <IconButton onClick={() => setOpenFeedback(true)}>
        <Tooltip title="Feedback">
          <Feedback />
        </Tooltip>
      </IconButton>

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
        sx={{ maxWidth: '800px' }}
      >
        <Box sx={{ p: 2 }}>
          <Typography gutterBottom variant="h4">
            Subject
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "13px" }}>
            This color bar allows you to edit the document subject ID or edit what parent folder it is a part of.
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

      <IconButton>
        <Tooltip title="Audit">
          <VerifiedUser />
        </Tooltip>
      </IconButton>

      <FeedbackModal
        open={openFeedback}
        setCallback={(value) => {
          console.log(value);
          setOpenFeedback(false);
        }}
      />
    </Fragment>
  );
}

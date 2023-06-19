import React, { useState, Fragment } from "react";
import {
  Box,
  IconButton as MuiIconButton,
  Popover,
  Stack,
  Tooltip,
} from "@mui/material";
import { Feedback, Help, Tty, VerifiedUser } from "@mui/icons-material";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import FeedbackModal from "../../../../../../@core/components/feedback-modal";

import VideoLibraryRoundedIcon from '@mui/icons-material/VideoLibraryRounded';
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';

const IconButton = styled((props) => (
  <MuiIconButton color="default" {...props} />
))(() => ({
  backgroundColor: "#f8f8f8",
  marginRight: 10,
}));

export default function HeaderIcons() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openFeedback, setOpenFeedback] = useState(false);
  const [fileUrl,setFileUrl] = useState("https://mwstraining.maplewoodsoftware.com/guides/mws/RevisionHistoryColorBar.pdf")
  const [fileName,setFilName] = useState("Revision History Color Bar")
  const [videoUrl,setVideoUrl] = useState("https://staffready.wistia.com/medias/ygzxmjpk9s")

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.click();
  }

  const handleOpenLink = () => {
    window.open(videoUrl, '_blank');
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
        <Box sx={{ p: 2, maxWidth: "400px"  }}>
          <Typography gutterBottom variant="h6">
            Revision History
          </Typography>
          <Stack direction="row" spacing={3}
            sx={{ justifyContent: "center", marginBottom: "15px"}}
          >
            <IconButton onClick={handleDownload}>
              <Tooltip title="Revision History Color Bar (PDF)">
                <PictureAsPdfRoundedIcon />
              </Tooltip>
            </IconButton>
            
            <IconButton onClick={handleOpenLink}>
              <Tooltip title="Revision History Video">
                <VideoLibraryRoundedIcon />
              </Tooltip>
            </IconButton>
          </Stack>
          <Typography variant="body1" sx={{ fontSize: "13px" }}>
            This color bar allows admins to view the revision history for the document including changelogs, revision comments, and each version of the document in the review cycle.
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

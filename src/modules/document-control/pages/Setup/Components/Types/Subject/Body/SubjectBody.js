import React, { useEffect, useState, Fragment } from "react";
import {
  Grid,
  IconButton as MuiIconButton,
  Popover,
  TextField,
  Tooltip,
} from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Feedback, Help, VerifiedUser } from "@mui/icons-material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import styled from "@emotion/styled";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ConfirmNotification from "../../../../../../../../@core/components/confirm-dialog";

const IconButton = styled((props) => (
  <MuiIconButton color="default" {...props} />
))(() => ({
  backgroundColor: "#f8f8f8",
  marginRight: 10,
}));

export default function SubjectBody() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEditing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    // set is loading
    // load data
  }, []);

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
      <Grid container>
        <Grid item xs></Grid>
        <Grid item xs={4} sx={{ textAlign: "center" }}>
          <IconButton>
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
            <Typography variant="body1" sx={{ p: 2, fontSize: "13px" }}>
              This color bar allows you to edit the document subject ID or edit
              what parent folder it is a part of.
            </Typography>
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
        </Grid>
        <Grid item xs></Grid>
        <Grid xs={12}>
          <CardContent sx={{ padding: "8px" }}>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Subject Name
            </Typography>
            {isEditing ? (
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                sx={{ mb: 2 }}
              />
            ) : (
              <Typography variant="subtitle1" component="div">
                Test Mohanad
              </Typography>
            )}
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Subject Parent
            </Typography>
            {isEditing ? (
              <Button
                onClick={() => setEditing(true)}
                variant="outlined"
                color="info"
              >
                [top]
              </Button>
            ) : (
              <Typography variant="subtitle1" component="div">
                [top]
              </Typography>
            )}
          </CardContent>
          <CardActions>
            {!isEditing ? (
              <>
                <Button
                  onClick={() => setEditing(true)}
                  variant="outlined"
                  color="info"
                  size="small"
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<CloudDownloadIcon />}
                  color="secondary"
                  size="small"
                >
                  Download All Files As ZIP
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => setEditing(false)}
                  variant="outlined"
                  color="inherit"
                  size="small"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => setEditing(false)}
                  variant="outlined"
                  color="inherit"
                  size="small"
                >
                  Save
                </Button>
                <Button
                  onClick={() => setConfirmDelete(true)}
                  variant="outlined"
                  color="error"
                  size="small"
                >
                  Delete
                </Button>
              </>
            )}
          </CardActions>
        </Grid>
      </Grid>
      <ConfirmNotification
        open={confirmDelete}
        setCallback={(value) => {
          console.log(value);
          setConfirmDelete(false);
        }}
      />
    </Fragment>
  );
}

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
import styled from "@emotion/styled";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const IconButton = styled((props) => (
  <MuiIconButton color="default" {...props} />
))(() => ({
  backgroundColor: "#f8f8f8",
  marginRight: 1,
}));

export default function SubjectBody() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEditing, setEditing] = useState(false);

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
            <Typography sx={{ p: 2 }}>Subject</Typography>
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
          <CardContent>
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
                label="Subject Name"
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
                size="small"
              >
                [top] | Change Parent
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
                <Button variant="outlined" color="secondary" size="small">
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
                  onClick={() => setEditing(false)}
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
    </Fragment>
  );
}

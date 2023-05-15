import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
} from "@mui/material";
const ConfirmNotification = ({ open, setCallback }) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return (
    <Dialog
      onClose={() => {
        setCallback(false);
      }}
      open={isOpen}
    >
      <DialogTitle>
        <Typography variant="h6" component="div">
          Delete
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1">
          Are you sure you want to delete this user ?
        </Typography>
        <Typography variant="subtitle2">
          You can't undo this operation
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setCallback(false);
          }}
          size="small"
          variant="outlined"
        >
          No
        </Button>
        <Button
          onClick={() => {
            setCallback(true);
          }}
          size="small"
          variant="outlined"
          color="error"
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmNotification;

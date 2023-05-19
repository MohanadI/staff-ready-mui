import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import axios from "axios";
import withAPI from "../../../api/core";
const FeedbackModal = ({ api, open, setCallback }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [licenseId, setLicenseId] = useState(null);

  useEffect(() => {
    setIsOpen(open);
    getLicenseId();
  }, [open]);

  const getLicenseId = () => {
    api.get("/StaffReady/v10/api/user-access/licenseId", (res) =>
      setLicenseId(res.data)
    );
  };

  return (
    <Dialog
      onClose={() => {
        setCallback(false);
      }}
      open={isOpen}
      fullWidth={true}
      maxWidth={"md"}
    >
      <DialogContent>
        <script
          type="text/javascript"
          src="https://s3.amazonaws.com/assets.freshdesk.com/widget/freshwidget.js"
        ></script>
        <style type="text/css" media="screen, projection">
          @import
          url(https://s3.amazonaws.com/assets.freshdesk.com/widget/freshwidget.css);
        </style>
        <iframe
          title="Feedback Form"
          className="freshwidget-embedded-form"
          id="freshwidget-embedded-form"
          src="https://staffready.freshdesk.com/widgets/feedback_widget/new?&widgetType=embedded&formTitle=Feedback&submitTitle=Send+Feedback&submitThanks=Thank+you+for+your+feedback&searchArea=no"
          scrolling="no"
          height="500px"
          width="100%"
          frameBorder="0"
        ></iframe>
      </DialogContent>
    </Dialog>
  );
};

export default withAPI(FeedbackModal);

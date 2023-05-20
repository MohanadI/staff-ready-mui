import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import withAPI from "../../../../../../../api/core";
import styled from "@emotion/styled";
import StatusIcon from "../../../../../../../@core/components/icon/StatusIcon";

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

const StyledList = styled(List)(({ theme }) => ({
  background: "#fbfbfb6b",
  borderRadius: 5,
  ".MuiListItem-root": {
    padding: 5,
    borderBottom: "1px solid #f2f2f2",
    ".MuiListItemIcon-root": {
      minWidth: 30,
    },
  },
}));

function EmptyStatus() {
  return (
    <>
      <Typography variant="h6">Document Preparation</Typography>
      <StyledList dense={true}>
        {generate(
          <ListItem>
            <ListItemIcon>
              <StatusIcon noApi={true} statusKey="ok"/>
            </ListItemIcon>
            <ListItemText primary="Single-line item" />
          </ListItem>
        )}
      </StyledList>
    </>
  );
}

export default withAPI(EmptyStatus);

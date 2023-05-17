import styled from "@emotion/styled";
import { tabClasses } from "@mui/material";
import Button, { buttonClasses } from '@mui/material/Button'


const StyledTab = styled(Button)(({ theme, active, tabidx, tabscount }) => {
  const tabBorder = {};

  if (tabidx == tabscount - 1) {
    tabBorder.borderLeft = "none";
  }

  if (tabidx === 0) {
    tabBorder.borderRight = "1px solid #fff";
  }

  return {
    padding: "5px 7px",
    [`&.${buttonClasses.root}`]: {
      borderRight: "1px solid #fff",
      flexGrow: active === "true" ? 2 : 1,
      background: active === "false" ? "grey" : "#EA6241",
      borderRadius: "0",
      boxShadow: "none",
      ...tabBorder,
      ".tab-text": {
        fontSize: "13px",
        fontWeight: "600",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",
        textTransform: "none",
      },
    },
    [`.${buttonClasses.startIcon}`]: {
      marginRight: active === "true" ? 2 : 0,
    },
  };
});

export default StyledTab
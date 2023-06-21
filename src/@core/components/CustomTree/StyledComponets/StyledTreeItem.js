import { styled, alpha } from "@mui/material/styles";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";

const StyledTreeItem = styled((props) => {
  return (
    <TreeItem {...props} classes={{ content: `tree-level-${props.level}` }} />
  );
})(({ theme }) => {
  return {
    [`.${treeItemClasses.root}`]: {},
    [`.${treeItemClasses.group}`]: {
      marginLeft: 15,
      borderLeft: `1px solid ${alpha(theme.palette.text.primary, 0.4)}`,
    },
    [`.${treeItemClasses.content}`]: {
      maxWidth: "100%",
      padding: 0,
      "&::before": {
        content: '""',
        borderBottom: `1px solid ${alpha(theme.palette.text.primary, 0.4)}`,
        paddingLeft: "10px",
      },

      "&.tree-level-1": {
        "&::before": {
          content: "none",
        },
      },

      ".MuiTypography-root": {
        maxWidth: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      },
    },
  };
});

export default StyledTreeItem;

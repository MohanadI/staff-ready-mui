import { useEffect, useState } from "react";
import {
  search_container_style,
  tree_wrapper
} from "./Style.js";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import TreeView from "@mui/lab/TreeView";
import StyledTreeItem from "./StyledComponets/StyledTreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeData from "./Data";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const CustomTree = (props) => {
  const [treeData, setTreeData] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [expandedIds, setExpanedIds] = useState([]);

  useEffect(() => {
    setTreeData(props.data);
  }, []);

  const renderData = (TreeData, level) => {
    return TreeData.map((node) => {
      let label = node.text;

      if (
        node.text?.toUpperCase()?.indexOf(searchVal?.trim()?.toUpperCase()) >
          -1 &&
        searchVal
      ) {
        const searchTextIdx = node.text
          .toUpperCase()
          .indexOf(searchVal.toUpperCase().trim());
        const textBeginig = node.text.slice(0, searchTextIdx);
        const textEnding = node.text.slice(
          searchTextIdx + searchVal.trim().length
        );
        const searchText = node.text.slice(
          searchTextIdx,
          searchVal.trim().length + 1
        );
        label = (
          <Box>
            {textBeginig}
            <Typography
              variant="body1"
              display={"inline-block"}
              sx={{ color: "#f50" }}
            >
              {searchText}
            </Typography>
            {textEnding}
          </Box>
        );
      }

      if (node.children) {
        return (
          <StyledTreeItem
            level={level}
            key={node.value}
            nodeId={node.value}
            label={label}
          >
            {renderData(node.children, level + 1)}
          </StyledTreeItem>
        );
      }
      return (
        <StyledTreeItem
          level={level}
          key={node.value}
          nodeId={node.value}
          label={label}
        />
      );
    });
  };

  const searchTree = (
    treeData = [],
    parentNode,
    searchVal = null,
    foundedIds = []
  ) => {
    treeData.forEach((node) => {
      if (
        node.text?.toUpperCase()?.indexOf(searchVal?.trim()?.toUpperCase()) > -1
      ) {
        foundedIds.push(node.value);
        if (parentNode) {
          foundedIds.push(parentNode.value);
        }
      }
      if (!node.children) {
        return;
      }
      searchTree(node.children, node, searchVal, foundedIds);
    });
  };

  const onSearch = (e) => {
    const { value } = e.target;
    const _searchVal = value === "" ? undefined : value;
    const matchedIds = [];
    searchTree(treeData, null, _searchVal, matchedIds);

    setExpanedIds(matchedIds);
    setSearchVal(value);
  };

  const resetSearch = () => {
    setSearchVal("");
    onSearch({ target: { value: "" } });
  };

  return (
    <Box sx={tree_wrapper}>
      <Box sx={search_container_style}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={8}>
            <TextField
              size="small"
              onChange={onSearch}
              value={searchVal}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              sx={{ width: "100%", height: "100%" }}
              size="small"
              variant="outlined"
              onClick={resetSearch}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </Box>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        expanded={expandedIds}
        onNodeToggle={(e, nodeIds) => setExpanedIds(nodeIds)}
        sx={{ maxWidth: 200 }}
        classes={{ root: "my-custom-tree-view" }} // add classes prop here
      >
        {renderData(TreeData, 1)}
      </TreeView>
    </Box>
  );
};

export default CustomTree;

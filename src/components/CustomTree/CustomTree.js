import { useContext, useEffect, useState } from "react";
import { search_container_style, tree_wrapper } from "./Style.js";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import TreeView from "@mui/lab/TreeView";
import StyledTreeItem from "./StyledComponets/StyledTreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";
import useWindowSize from "../../@core/hooks/useWindowSize.js";

const CustomTree = (props) => {
  const [treeData, setTreeData] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [expandedIds, setExpandedIds] = useState([]);
  const { handleContextDataChange } = useContext(props.context);
  const { height } = useWindowSize();

  useEffect(() => {
    setTreeData(props.data);
  }, [props.data]);

  const renderData = (TreeData, level) => {

    return TreeData.map(node => {
      let label = node.text

      if (node.text?.toUpperCase()?.indexOf(searchVal?.trim()?.toUpperCase()) > -1 && searchVal) {

        const targetIdx = node?.text?.toUpperCase()?.indexOf(searchVal?.toUpperCase());

        const beforeStr = node?.text.substring(0, targetIdx);
        const afterStr = node?.text.slice(targetIdx + searchVal.length)
        const originalText = node?.text.slice(targetIdx, targetIdx + searchVal.length)
        label = <Box>
          {beforeStr}
          <Typography variant='body1' display={'inline-block'} sx={{ color: '#f50', fontSize: '13px' }}>
            {originalText}
          </Typography>
          {afterStr}
        </Box>
      }

      if (node.children) {
        return (<StyledTreeItem level={level} key={node.value} nodeId={node.value}
          label={label}
        >
          {renderData(node.children, level + 1)}
        </StyledTreeItem>)
      }
      return <StyledTreeItem level={level} key={node.value} nodeId={node.value} label={label} />
    })

  }

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

    setExpandedIds(matchedIds);
    setSearchVal(value);
  };

  const resetSearch = () => {
    setSearchVal("");
    onSearch({ target: { value: "" } });
  };

  const findObjectById = (objects, id) => {
    let match = objects.find((obj) => obj.value === id);
    if (match) {
      return match;
    }

    for (const obj of objects) {
      if (obj.children && obj.children.length > 0) {
        match = findObjectById(obj.children, id);
        if (match) {
          return match;
        }
      }
    }

    return null;
  };

  return (
    <Box sx={tree_wrapper}>
      <Box sx={search_container_style}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={9}>
            <TextField
              size="small"
              onChange={onSearch}
              value={searchVal}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              sx={{ minWidth: "100%", height: "100%" }}
              size="small"
              variant="outlined"
              onClick={resetSearch}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </Box>
      <PerfectScrollbar style={{ height: height - 250 }}>
        {props.isLoading ? (
          <div style={{ textAlign: "center" }}>
            <CircularProgress size={25} />
          </div>
        ) : (
          <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            expanded={expandedIds}
            onNodeSelect={(e, node) => {
              const match = findObjectById(treeData, node);
              handleContextDataChange(match, "selectedNode");
            }}
            onNodeToggle={(e, nodeIds) => setExpandedIds(nodeIds)}
            classes={{ root: "my-custom-tree-view" }} // add classes prop here
          >
            {renderData(treeData, 1)}
          </TreeView>
        )}
      </PerfectScrollbar>
    </Box>
  );
};

export default CustomTree;

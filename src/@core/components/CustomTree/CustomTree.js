import React, { useContext, useEffect, useState } from "react";
import { search_container_style, tree_wrapper } from "./Style.js";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import TreeView from "@mui/lab/TreeView";
import StyledTreeItem from "./StyledComponets/StyledTreeItem.js";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";
import useWindowSize from "../../hooks/useWindowSize.js";

const CustomTree = (props) => {
  const [treeData, setTreeData] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [expandedIds, setExpandedIds] = useState(props.defaultExpandIds || []);
  const { height } = useWindowSize();

  const { onNodeSelect = (() => { }) } = props

  useEffect(() => {
    if (props.api) {
      (async () => {
        const resp = await props.api();
        setTreeData(resp.data);
      })()
    } else {
      setTreeData(props.data);
    }

  }, [props.data]);

  const renderData = (TreeData, level) => {
    return TreeData?.map(node => {
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

      if (typeof props.nodeFormatter === 'function') {
        label = props.nodeFormatter(node);
      }

      let TreeItem = <StyledTreeItem />
      if (typeof props.styledTreeItem === 'function') {
        TreeItem = props.styledTreeItem(<StyledTreeItem />)
      }

      const itemProps = {
        level,
        label,
        key: node.value,
        nodeId: node.value || '0',
      }

      if (node.children) {
        itemProps.children = renderData(node.children, level + 1)
        return React.cloneElement(TreeItem, { ...TreeItem.props, ...itemProps })
      }

      return React.cloneElement(TreeItem, { ...TreeItem.props, ...itemProps })
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
    let matchedIds = !_searchVal ? props.defaultExpandIds : [];
    searchTree(treeData, null, _searchVal, matchedIds);
    if (matchedIds.length === 0) {
      matchedIds = props.defaultExpandIds;
    }

    setExpandedIds(matchedIds);
    setSearchVal(value);
  };

  const resetSearch = () => {
    setSearchVal("");
    onSearch({ target: { value: "" } });
  };



  return (
    <Box sx={tree_wrapper}>
      {!props.hideFilter ?

        <Box sx={search_container_style}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={9}>
              <TextField
                size="small"
                onChange={onSearch}
                value={searchVal}
                sx={{ width: "100%" }}
                placeholder="search"
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
        : null

      }
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
            onNodeSelect={(e, node) => onNodeSelect(e, node, treeData)}
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

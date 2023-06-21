import React, { useContext, useEffect, useState } from "react";
import { search_container_style, tree_wrapper } from "./Style.js";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import TreeView from "@mui/lab/TreeView";
import SvgIcon from "@mui/material/SvgIcon";
import StyledTreeItem from "./StyledComponets/StyledTreeItem.js";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";
import useWindowSize from "../../hooks/useWindowSize.js";
import TreeIcon from "../icon/TreeIcon.js";

function MinusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

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
        const afterStr = node?.text.slice(targetIdx + searchVal.length);
        const originalText = node?.text.slice(
          targetIdx,
          targetIdx + searchVal.length
        );

        label = (
          <Box>
            {beforeStr}
            <Typography
              variant="body2"
              display={"inline-block"}
              sx={{ color: "#ea6241", fontWeight: "bold" }}
            >
              {originalText}
            </Typography>
            {afterStr}
          </Box>
        );
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
            defaultCollapseIcon={<MinusSquare />}
            defaultExpandIcon={<PlusSquare />}
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

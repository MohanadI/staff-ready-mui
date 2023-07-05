import { useEffect, useState } from "react";
import DropdownTreeSelect from "react-dropdown-tree-select";
import { isEqual } from "lodash";

import withAPI from "../../../api/core";
import "react-dropdown-tree-select/dist/styles.css";
import "./index.css";

function SelectWithTreeOptions({
  api,
  multiSelect,
  defaultValue,
  value,
  onOptionsChanged,
  url,
  addTopLevel,
  selectableType,
  displayParentSelected,
  readOnly,
  disabled,
  placeholder,
}) {
  const [state, setState] = useState({
    multiSelectEnabled: multiSelect,
    selectedNodePks: [],
    treeData: [],
  });

  useEffect(() => {
    loadTreeData();
  }, []);

  const loadTreeData = () => {
    api.get(
      url,
      (response) => {
        let addTopLevelTemp;
        if (addTopLevel) {
          addTopLevelTemp = [
            {
              value: "0",
              text: "[top level]",
              type: selectableType,
              children: response,
            },
          ];
        } else if (isEqual(response, [])) {
          addTopLevelTemp = [
            {
              value: "0",
              text: "No data found",
              type: "none",
              children: response,
            },
          ];
        }
        let data = getFormattedTreeData(
          addTopLevelTemp || response,
          state.selectedNodePks
        );
        setState((prevState) => ({
          ...prevState,
          treeData: data,
        }));
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const getFormattedTreeData = (
    data,
    selectedNodePks = null,
    parentValue,
    parentLabel
  ) => {
    let tempData = [];
    for (let i = 0; i < data.length; i++) {
      const nodeData = data[i];
      const type = nodeData.type;
      const value = nodeData.value;
      const children = nodeData.children;
      const label = nodeData.text || nodeData.label;

      const selectableType = selectableType || type;
      const disabledParentNode = type !== selectableType;
      const isNodeSelected =
        type === selectableType && isSelectedNode(value, selectedNodePks);

      tempData.push({
        value: value,
        parentValue: parentValue,
        tagLabel: displayParentSelected
          ? `${parentLabel ? parentLabel + ":" : ""}\n${label}`
          : undefined,
        label: label,
        disabled: disabledParentNode,
        checked: isNodeSelected,
        selected: isNodeSelected,
        expanded: multiSelect && isNodeSelected,
        type: type,
        children: children
          ? getFormattedTreeData(children, selectedNodePks, value, label)
          : [],
      });
    }
    return tempData;
  };

  const isSelectedNode = (nodePk, selectedNodePks) => {
    if (!selectedNodePks) return false;
    for (let i = 0; i < selectedNodePks.length; i++) {
      if (selectedNodePks[i].value === nodePk) return true;
    }
    return false;
  };

  const onChange = (currentNode, selectedNodes) => {
    let data = getFormattedTreeData(state.treeData, selectedNodes);
    setState((prevState) => ({
      ...prevState,
      treeData: data,
      selectedNodePks: selectedNodes,
    }));
    onOptionsChanged(selectedNodes);
  };

  return (
    <DropdownTreeSelect
      data={state.treeData}
      onChange={onChange}
      className="mdl-demo"
    />
  );
}

export default withAPI(SelectWithTreeOptions);

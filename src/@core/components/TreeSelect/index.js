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
        console.log(state.treeData, "treeData");
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

  const getFormattedTreeData = (data, parentValue, parentLabel) => {
    let treeData = [];
    for (let i = 0; i < data.length; i++) {
      const nodeData = data[i];
      const type = nodeData.type;
      const value = nodeData.value;
      const children = nodeData.children;
      const label = nodeData.text || nodeData.label;

      const selectableType = selectableType || type;
      const disabledParentNode = type !== selectableType;
      const isNodeSelected = type === selectableType;

      treeData.push({
        value: value,
        parentValue: parentValue,
        tagLabel: displayParentSelected
          ? `${parentLabel ? parentLabel + ":" : ""}\n${label}`
          : undefined,
        label: label,
        disabled: disabledParentNode,
        expanded: multiSelect && isNodeSelected,
        type: type,
        children: children ? getFormattedTreeData(children, value, label) : [],
      });
    }
    return treeData;
  };

  const onChange = (currentNode, selectedNodes) => {
    console.log("path::", selectedNodes);
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
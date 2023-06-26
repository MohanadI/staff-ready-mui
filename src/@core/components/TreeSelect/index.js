import React, { useEffect, useState } from "react";

import "./TreeSelectStyle.scss";
import withAPI from "../../../api/core";
import { isEqual } from "lodash";

function TreeSelect({
  api,
  multiSelect,
  selectedNodePks,
  selectedNodePk,
  defaultValue,
  value,
  url,
  addTopLevel,
  selectableType,
  displayParentSelected,
  readOnly,
  disabled,
}) {
  const [state, setState] = useState({
    multiSelectEnabled: multiSelect,
    selectedNodePks: getSelectedNodePks(),
    treeData: [],
  });

  useEffect(() => {
    LoadTreeData();
  }, []);

  const LoadTreeData = () => {
    api.get(
      url,
      (response) => {
        if (response.status === 200) {
          let addTopLevelTemp;
          if (addTopLevel) {
            addTopLevelTemp = [
              {
                value: "0",
                text: "[top level]",
                type: selectableType,
                children: response.data,
              },
            ];
          } else if (isEqual(response.data, [])) {
            addTopLevelTemp = [
              {
                value: "0",
                text: "No data found",
                type: "none",
                children: response.data,
              },
            ];
          }
          let data = getFormattedTreeData(
            addTopLevelTemp || response.data,
            selectedNodePks
          );
          setState((prevState) => ({
            ...prevState,
            treeData: data,
            hasLoaded: true,
          }));
        } else {
          console.log("Failed to get data");
        }
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
    let treeData = [];
    for (let i = 0; i < data.length; i++) {
      const nodeData = data[i];
      const type = nodeData.type;
      const value = nodeData.value;
      const children = nodeData.children;
      const label = nodeData.text || nodeData.label;

      // selectableType check ensures that if different domain objects have the same Pk we select the correct object
      const selectableType = selectableType || type;
      const disabledParentNode = type !== selectableType;
      const isNodeSelected =
        type === selectableType && isSelectedNode(value, selectedNodePks);

      treeData.push({
        value: value,
        parentValue: parentValue,
        tagLabel: displayParentSelected
          ? `${parentLabel}:\n${label}`
          : undefined,
        label: label,
        disabled: disabledParentNode,
        checked: isNodeSelected,
        selected: isNodeSelected,
        expanded: multiSelect && isNodeSelected, // May want this only active in multi-select mode
        type: type,
        children: children
          ? getFormattedTreeData(children, selectedNodePks, value, label)
          : [],
      });
    }
    return treeData;
  };

  const isSelectedNode = (nodePk, selectedNodePks) => {
    if (!selectedNodePks) return false;
    for (let i = 0; i < selectedNodePks.length; i++) {
      if (selectedNodePks[i] == nodePk) return true;
    }
    return false;
  };

  const getSelectedNodePks = () => {
    let pks = [];
    if (selectedNodePks?.length > 0) pks = pks.concat(selectedNodePks);
    else if (selectedNodePk == 0) pks.push(selectedNodePk);
    else if (defaultValue == 0) pks.push(defaultValue);
    else if (value == 0) pks.push(value);
    return pks;
  };

  const flattenTreeData = (treeData) => {
    const result = [];
    result.push(...treeData);
    for (let index in treeData) {
      const node = treeData[index];
      if (node.children && node.children.length > 0)
        result.push(...flattenTreeData(node.children));
    }
    return result;
  };

  const onFocus = () => {
    if (state.treeData.length === 0) {
      LoadTreeData();
    }
  };

  const onTreeChanged = (selectedNode, selectedNodes) => {
    // save node change
    let updatedData = JSON.parse(JSON.stringify(state.treeData));
    let selectedNodePks = state.selectedNodePks;

    // check if deselecting item
    if (selectedNodePks.includes(selectedNode.value)) {
      let i = selectedNodePks.indexOf(selectedNode.value);
      selectedNodePks.splice(i, 1);
    } else {
      //selecting item
      if (!state.multiSelectEnabled) {
        selectedNodePks = [];
      }
      selectedNodePks.push(selectedNode.value);
    }
    updatedData = updateTreeData(updatedData, selectedNodePks);

    onChange(selectedNode, updatedData, selectedNodes);
  };

  const updateTreeData = (treeData, selectedNodePks) => {
    treeData = getFormattedTreeData(treeData, selectedNodePks);
    setState((prevState) => ({
      ...prevState,
      treeData: treeData,
      selectedNodePks: selectedNodePks,
    }));
  };

  const getSelectedNodeStrings = (treeData) => {
    const selectedStrings = [];
    const flatTreeData = flattenTreeData(treeData);
    const nodeSelectedPks = state.selectedNodePks || selectedNodePks;
    for (let i = 0; i < nodeSelectedPks.length; i++) {
      const val = nodeSelectedPks[i];
      for (let ii = 0; ii < flatTreeData.length; ii++) {
        const node = flatTreeData[ii];
        if (node.value == val) {
          selectedStrings.push(node.label);
          break;
        }
      }
    }
    return selectedStrings;
  };

  let texts = {
    placeholder: this.props.placeholder,
  };

  let mode = multiSelect ? "hierarchical" : "radioSelect";

  const treeData = state.treeData;
  const readOnlyValue = getSelectedNodeStrings(treeData).join(", ");

  return (
    <>
      {readOnly ? (
        <input
          disabled
          readOnly
          value={readOnlyValue}
          className="form-control-plaintext"
        />
      ) : (
        <DropdownTreeSelect
          className={"treeSelect"}
          id={"tree-select-container"}
          clearSearchOnChange
          data={treeData}
          onChange={onTreeChanged}
          onFocus={onFocus}
          mode={mode}
          texts={texts}
          readOnly={readOnly}
          disabled={disabled}
          keepOpenOnSelect={true}
        />
      )}
    </>
  );
}

export default withAPI(TreeSelect);

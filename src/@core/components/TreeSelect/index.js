import React, { useEffect, useState } from "react";
import DropdownTreeSelect from "react-dropdown-tree-select";
import { isEqual } from "lodash";
import { Controller } from "react-hook-form";
import withAPI from "../../../api/core";
import "react-dropdown-tree-select/dist/styles.css";
import "./TreeSelectStyle.scss";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

function SelectWithTreeOptions({
  api,
  multiSelect,
  onOptionsChanged,
  url,
  addTopLevel,
  selectableType,
  displayParentSelected,
  formHookProps,
  isFormComp,
  name,
  validation,
  label,
  error,
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

      const selectableTypeValue = selectableType || type;
      const disabledParentNode = type !== selectableTypeValue;
      const isNodeSelected =
        type === selectableTypeValue && isSelectedNode(value, selectedNodePks);

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
    const filteredNodes = selectedNodePks.filter((v) => v.value === nodePk);
    if (filteredNodes.length > 0) {
      return true;
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

    if (typeof onOptionsChanged === "function") {
      onOptionsChanged(selectedNodes);
    }
  };

  const SelectComp = (
    <DropdownTreeSelect
      data={state.treeData}
      onChange={onChange}
      className={"treeSelect"}
      id={"tree-select-container"}
    />
  );

  if (isFormComp) {
    return (
      <Controller
        control={formHookProps.control}
        name={name}
        render={({ field }) => {
          const {
            onChange: formHookOnChange,
            value,
            onFocus,
            ...restFormProps
          } = field;
          const data = getFormattedTreeData(state.treeData, value);

          function _onChange(currentNode, selectedNodes) {
            formHookOnChange(selectedNodes);
            onChange(currentNode, selectedNodes);
          }

          return (
            <FormControl error={error} required={validation.required}>
              <FormLabel>{label}</FormLabel>
              {React.cloneElement(SelectComp, {
                ...SelectComp.props,
                data,
                onChange: _onChange,
                focus: onFocus,
                ...restFormProps,
              })}
            </FormControl>
          );
        }}
        rules={validation}
      />
    );
  }

  return SelectComp;
}

export default withAPI(SelectWithTreeOptions);

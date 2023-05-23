import { useContext, useEffect, useState } from "react";
import StyledTab from "./StyledComponent/StyledTab";
import Box from "@mui/material/Box";
import cloneDeep from "lodash/cloneDeep";
import { Typography } from "@mui/material";

const CustomTabs = (props) => {
  const [tabsConfig, setTabsConfig] = useState([]);
  const { handleContextDataChange } = useContext(props.context);

  useEffect(() => {
    const _tabsConfig = cloneDeep(props.tabsConfig);
    _tabsConfig[0].active = true;
    setTabsConfig(_tabsConfig);
  }, [props.tabsConfig]);

  const onChange = (tabName, tabIdx) => {
    handleContextDataChange(tabName, "activeTab");
    const _tabsConfig = cloneDeep(tabsConfig);
    _tabsConfig.forEach((tab) => {
      if (tab.name === tabName) {
        tab.active = true;
      } else {
        tab.active = false;
      }
    });
    setTabsConfig(_tabsConfig);
  };
  return (
    <Box sx={{ display: "flex" }}>
      {tabsConfig.map((tab, idx) => {
        return (
          <StyledTab
            key={idx}
            title={tab.name}
            active={tab.active.toString()}
            size="small"
            variant="contained"
            onClick={() => onChange(tab.name, idx)}
            startIcon={tab.icon}
            tabscount={tabsConfig.length}
            tabidx={idx}
          >
            {tab.active ? (
              <Typography display={"inline-block"} className={"tab-text"}>
                {tab.label}
              </Typography>
            ) : null}
          </StyledTab>
        );
      })}
    </Box>
  );
};

export default CustomTabs;

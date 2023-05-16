import { useEffect, useState } from "react";
import StyledTab from "./StyledComponent/StyledTab";
import Box from "@mui/material/Box";
import cloneDeep from "lodash/cloneDeep";
import { Typography } from "@mui/material";

const CustomTabs = (props) => {
  const [tabVal, setTabVal] = useState(0);
  const [activeTabLabel, setActiveTabLabel] = useState("");
  const [tabsConfig, setTabsConfig] = useState([]);
  // const [activeTab, setActiveTab] = useState(tabsConfig[0].name);

  useEffect(() => {
    const _tabsConfig = cloneDeep(props.tabsConfig);
    _tabsConfig[0].active = true;
    setTabsConfig(_tabsConfig);
  }, [props.tabsConfig]);

  const onChange = (tabName, tabIdx) => {
    // setActiveTab(tabName)
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
            variant="outlined"
            onClick={() => onChange(tab.name, idx)}
            startIcon={tab.icon}
            tabsCount={tabsConfig.length}
            tabIdx={idx}
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

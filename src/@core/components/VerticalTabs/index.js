import { useState } from "react";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const VerticalTabs = ({ tabs, title }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container spacing={2} sx={{marginTop: 0}}>
      <Grid item xs={3}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label={title}
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          {tabs.map((item, index) => (
            <Tab
              key={"tab-" + item.key}
              label={item.label}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </Grid>
      <Grid item xs={9}>
        {tabs.map((item, index) => (
          <TabPanel key={"TabPanel-" + item.key} value={value} index={index}>
            {item.body}
          </TabPanel>
        ))}
      </Grid>
    </Grid>
  );
};

export default VerticalTabs;

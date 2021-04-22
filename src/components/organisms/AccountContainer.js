/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import profilePhoto from "../../Image/user.png";

export function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  firstPanel: {
    width: "100%",
  },
  secondPanel: {
    width: "100%",
  },
}));

export default function AccountContainer({ children }) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="關於我" {...a11yProps(0)} />
        <Tab label="我的POST" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0} className={classes.firstPanel}>
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12} component="div">
            <img src={profilePhoto} />
          </Grid>
          <Grid item xs={12}>
            {children[0]}
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.secondPanel}>
        <Grid container direction="column" alignItems="center">
          {children[1]}
        </Grid>
      </TabPanel>
    </>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

AccountContainer.propTypes = {
  children: PropTypes.array,
};

import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
  table: {
    height: "100%",
  },
}));

export default function IPriceContainer({ children }) {
  const classes = useStyles();
  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={12} sm={4}>
        {children[0]}
      </Grid>
      <Grid item xs={12} sm={8}>
        <div className={classes.table}>{children[1]}</div>
      </Grid>
    </Grid>
  );
}

IPriceContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

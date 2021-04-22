import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import withWidth from "@material-ui/core/withWidth";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "85vh",
    marginTop: theme.spacing(5),
    padding: theme.spacing(2),
    position: "relative",
  },
  button: {
    marginBottom: theme.spacing(2),
  },
  sideBar: {
    wordBreak: "break-all",
    whiteSpace: "pre-line",
    textAlign: "center",
  },
  board: {
    wordBreak: "break-all",
    whiteSpace: "pre-line",
  },
  sidePaper: {
    minHeight: "85vh",
    padding: theme.spacing(5, 1, 2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  boardTitle: {
    borderBottom: "1px solid #cccccc",
    height: theme.spacing(11),
  },
}));

function Dashboard({ title, children }) {
  const classes = useStyles();

  return (
    <Container maxWidth="xl" className={classes.root}>
      <Grid container direction="row" component="main">
        <Hidden xsDown>
          <Grid
            item
            xs={false}
            sm={2}
            className={classes.sideBar}
            component="aside"
          >
            <Paper elevation={3} className={classes.sidePaper}>
              <Box className={classes.boardTitle}>
                <Typography variant={"h5"}>{title} DashBoard</Typography>
              </Box>
              <Box>Admin 1</Box>
            </Paper>
          </Grid>
        </Hidden>
        <Grid
          item
          xs={12}
          sm={10}
          className={classes.board}
          component="section"
        >
          {children}
        </Grid>
      </Grid>
    </Container>
  );
}

Dashboard.propTypes = {
  width: PropTypes.oneOf(["lg", "md", "sm", "xl", "xs"]).isRequired,
  title: PropTypes.string,
  children: PropTypes.string.isRequired,
};

export default withWidth()(Dashboard);

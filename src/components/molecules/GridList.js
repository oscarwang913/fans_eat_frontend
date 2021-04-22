import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background,
  },
  gridList: {
    width: "50%",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  image: {
    width: "100%",
  },
}));

export default function AllPostGrid({ posts }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cols={3} cellHeight={260} className={classes.gridList}>
        {posts &&
          posts.map((post) => (
            <GridListTile key={post.id} rows={1}>
              <img
                src={post.image}
                alt={post.content}
                className={classes.image}
              />
              <GridListTileBar
                title={post.content}
                actionIcon={
                  <IconButton
                    aria-label={`info about ${post.content}`}
                    className={classes.icon}
                  ></IconButton>
                }
              />
            </GridListTile>
          ))}
      </GridList>
    </div>
  );
}

AllPostGrid.propTypes = {
  posts: PropTypes.object,
};

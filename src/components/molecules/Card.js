import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { timeConvert } from "../../utlis";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 331,
    marginRight: theme.spacing(2),
  },
  simpleCardRoot: {
    margin: theme.spacing(1),
    cursor: "pointer",
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  avatar: {
    backgroundColor: "#ff0000",
  },

  photoCard: {
    marginBottom: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(1),
  },

  photo: {
    width: "30%",
    height: "30%",
    objectFit: "contain",
  },
  likeIcon: {
    cursor: "pointer",
    marginRight: theme.spacing(1),
  },
  likedIcon: {
    color: "#ff0000",
    marginRight: theme.spacing(1),
  },
  likeSection: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
}));

export function PhotoCard({ imageUrl }) {
  const classes = useStyles();
  return (
    <Card className={classes.photoCard}>
      <CardMedia component="img" className={classes.photo} image={imageUrl} />
    </Card>
  );
}

export function SimpleCardComponent({ post, children, handleOpen }) {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.simpleCardRoot}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {post.User.userName[0]}
            </Avatar>
          }
          title={post.User.userName}
          subheader={timeConvert(post.createdAt)}
        />
        <CardMedia
          className={classes.media}
          image={post.image}
          onClick={handleOpen}
          data-id={post.id}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h4">
            {post.content}
          </Typography>
          <Box component="div" className={classes.likeSection}>
            {children}
            <Typography gutterBottom variant="h6" component="h4">
              {post.Total}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

PhotoCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};

SimpleCardComponent.propTypes = {
  post: PropTypes.object.isRequired,
  handleOpen: PropTypes.func,
  children: PropTypes.node.isRequired,
};

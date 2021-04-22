import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { selectSinglePost } from "../../redux/reducers/postSlice";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  container: {
    width: "100%",
  },
  image: {
    width: "100%",
  },
}));

export default function ContentModal({ open, handleClose }) {
  const classes = useStyles();
  const singlePost = useSelector(selectSinglePost);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {singlePost && (
              <Box className={classes.container}>
                <Typography
                  variant="h6"
                  color="primary"
                  gutterBottom
                  className={classes.username}
                >
                  {singlePost.post.User.userName}
                </Typography>
                <img
                  className={classes.image}
                  src={singlePost.post.image}
                  alt="postImg"
                />
              </Box>
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

ContentModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Paper } from "@material-ui/core";
import { NewPostForm } from "../../components/molecules/Form";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../redux/reducers/authSlice";
import { createPost } from "../../redux/reducers/postSlice";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: "85vh",
    marginTop: theme.spacing(5),
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    textAlign: "center",
  },
  paper: {
    width: "100%",
    padding: theme.spacing(2),
    height: "100%",
  },
}));

export default function NewPost() {
  const classes = useStyles();
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector(selectUser).user.id;

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e) => {
    let url = URL.createObjectURL(e.target.files[0]);
    setFile(e.target.files[0]);
    setImage(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost(content, file, userId)).then((res) => {
      if (res && res.success === true) {
        history.push("/");
      }
    });
  };

  return (
    <Container component="main" maxWidth="md" className={classes.root}>
      <Paper elevation={1} className={classes.paper}>
        <form
          onSubmit={handleSubmit}
          className={classes.form}
          encType="multipart/form-data"
        >
          <NewPostForm
            content={content}
            image={image}
            userId={userId}
            handleContentChange={handleContentChange}
            handleImageChange={handleImageChange}
          />
        </form>
      </Paper>
    </Container>
  );
}

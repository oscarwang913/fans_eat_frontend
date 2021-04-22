import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container } from "@material-ui/core";
import { SimpleCardComponent } from "../../components/molecules/Card";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Button from "@material-ui/core/Button";
import { getAuthToken } from "../../utlis";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Like } from "../../components/atoms/Loading";
import MainPagination from "../../components/atoms/Pagination";
import ContentModal from "../../components/atoms/Modal";
import {
  getAllPost,
  getSinglePost,
  getTotalLikeCount,
  getTotalPostCounut,
  createPostLike,
  selectallPosts,
  selectCurrentPage,
  selectTotalLikeCount,
  selectIsLoadingLikeCount,
  setCurrentPage,
  resetSinglePost,
} from "../../redux/reducers/postSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "85vh",
    marginTop: theme.spacing(5),
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main,
  },
  likeIcon: {
    cursor: "pointer",
  },
  likeButton: {
    backgroundColor: "transparent",
    outline: "none",
    border: "none",
    padding: 0,
  },
}));

export default function Home() {
  const classes = useStyles();
  const token = getAuthToken();
  const dispatch = useDispatch();
  const history = useHistory();
  const postsPerPage = 12;
  const posts = useSelector(selectallPosts);
  const totalLikeCount = useSelector(selectTotalLikeCount);
  const isLoadingLikeCount = useSelector(selectIsLoadingLikeCount);
  let currentPage = useSelector(selectCurrentPage);
  const [open, setOpen] = useState(false);

  const handleOpen = (e) => {
    setOpen(true);
    dispatch(getSinglePost(e.target.dataset.id));
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(resetSinglePost());
  };

  useEffect(() => {
    dispatch(getTotalPostCounut());
    dispatch(getAllPost(currentPage, postsPerPage));
  }, [dispatch, currentPage, postsPerPage, totalLikeCount]);

  useEffect(() => {
    if (token == null || !token) {
      history.push("/signin");
    } else {
      history.push("/");
    }
  }, [history, token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let postId = parseInt(e.target.postId.value);
    dispatch(createPostLike(postId));
    dispatch(getTotalLikeCount());
  };

  const handlePageClick = (page) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <>
      <ContentModal handleClose={handleClose} open={open} />
      <Container maxWidth="lg" className={classes.root}>
        {posts && posts.length > 0 && (
          <>
            <Grid container spacing={1} direction="row" justify="center">
              {posts &&
                posts.length > 0 &&
                posts.map((post, index) => (
                  <Grid item xs={12} sm={3} key={index}>
                    <SimpleCardComponent post={post} handleOpen={handleOpen}>
                      <form onSubmit={handleSubmit}>
                        <input type="hidden" value={post.id} name="postId" />
                        <Button
                          data-id={post.id}
                          type="submit"
                          className={classes.likeButton}
                        >
                          <FavoriteBorderIcon className={classes.likeIcon} />
                        </Button>
                      </form>
                    </SimpleCardComponent>
                  </Grid>
                ))}
            </Grid>
            {isLoadingLikeCount && <Like />}
            <MainPagination
              postsPerPage={postsPerPage}
              currentPage={currentPage}
              handlePageClick={handlePageClick}
            />
          </>
        )}
      </Container>
    </>
  );
}

import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { useSelector } from "react-redux";
import {
  selectTotalPostCount,
  selectCurrentPage,
} from "../../redux/reducers/postSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
  PaginationContainer: {
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
  },
  activePageNumber: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    fontSize: "28px",
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.primary.main}`,
    cursor: "pointer",
    marginRight: "8px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  pageNumber: {
    fontSize: "16px",
    padding: theme.spacing(2),
    cursor: "pointer",
    marginRight: "8px",
  },
}));

export default function MainPagination({ postsPerPage, handlePageClick }) {
  const totalPostCount = useSelector(selectTotalPostCount);
  let currentPage = useSelector(selectCurrentPage);
  const classes = useStyles();
  const count = Math.ceil(totalPostCount / postsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= count; i++) {
    pageNumbers.push(i);
  }
  return (
    <Box className={classes.PaginationContainer}>
      {pageNumbers.map((pageNumber) => (
        <Box
          className={
            pageNumber === currentPage
              ? classes.activePageNumber
              : classes.pageNumber
          }
          key={pageNumber}
          onClick={() => {
            handlePageClick(pageNumber);
          }}
        >
          {pageNumber}
        </Box>
      ))}
    </Box>
  );
}

MainPagination.propTypes = {
  postsPerPage: PropTypes.number.isRequired,
  handlePageClick: PropTypes.func,
};

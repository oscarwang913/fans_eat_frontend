import React from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { setCurrentPage } from "../../redux/reducers/userAdminSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectTotalCount } from "../../redux/reducers/userAdminSlice";

const useStyles = makeStyles({
  pagination: {
    height: "10vh",
  },
});

export function Pagination({ currentPage, usersPerPage }) {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const userTotalCount = useSelector(selectTotalCount);

  const handleBackButtonClick = (page) => {
    dispatch(setCurrentPage(page - 1));
  };
  const handleNextButtonClick = (page) => {
    dispatch(setCurrentPage(page + 1));
  };
  return (
    <div className={classes.pagination}>
      <IconButton
        onClick={() => {
          handleBackButtonClick(currentPage);
        }}
        disabled={currentPage === 1}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      {`${currentPage} of ${Math.ceil(userTotalCount / usersPerPage)}`}
      <IconButton
        onClick={() => {
          handleNextButtonClick(currentPage);
        }}
        disabled={currentPage > Math.ceil(userTotalCount / usersPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  usersPerPage: PropTypes.number.isRequired,
};

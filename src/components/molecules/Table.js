import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Pagination } from "../atoms/TablePagination";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    height: "75vh",
    overflowX: "auto",
  },

  pricetable: {
    height: "80vh",
    OverflowY: "scroll",
  },
});

export function UserAdminTable({ children, currentPage, usersPerPage }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Pagination currentPage={currentPage} usersPerPage={usersPerPage} />
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User Id</TableCell>
            <TableCell align="right">Full Name</TableCell>
            <TableCell align="right">User Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Current Status</TableCell>
            <TableCell align="right">Activate</TableCell>
            <TableCell align="right">Inactivate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
}

export function PriceTable({ crop }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.pricetable}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell align="center">日期</TableCell>
            <TableCell align="center">菜名</TableCell>
            <TableCell align="center">市場名稱</TableCell>
            <TableCell align="center">均價</TableCell>
            <TableCell align="center">最高價</TableCell>
            <TableCell align="center">最低價</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {crop.map((item, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {item.TransDate}
              </TableCell>
              <TableCell component="th" scope="row">
                {item.CropName}
              </TableCell>
              <TableCell align="right">{item.MarketName}</TableCell>
              <TableCell align="right">{item.Avg_Price}</TableCell>
              <TableCell align="right">{item.Upper_Price}</TableCell>
              <TableCell align="right">{item.Lower_Price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

UserAdminTable.propTypes = {
  children: PropTypes.node.isRequired,
  currentPage: PropTypes.number.isRequired,
  usersPerPage: PropTypes.number.isRequired,
};

PriceTable.propTypes = {
  crop: PropTypes.object.isRequired,
};

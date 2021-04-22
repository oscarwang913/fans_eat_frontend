import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Dashboard from "../../components/organisms/DashBoard";
import { Loading } from "../../components/atoms/Loading";
import { UserAdminTable } from "../../components/molecules/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import {
  getAllUsers,
  changeUserAuth,
  selectIsLoadingUpdateAuth,
  selectAllUsers,
  selectCurrentPage,
  getTotalCounut,
} from "../../redux/reducers/userAdminSlice";

export default function UserDashboard() {
  const dispatch = useDispatch();
  const isLoadingUpdateAuth = useSelector(selectIsLoadingUpdateAuth);
  const allUsers = useSelector(selectAllUsers).users;
  const currentPage = useSelector(selectCurrentPage);
  const usersPerPage = 5;

  useEffect(() => {
    dispatch(getTotalCounut());
    dispatch(getAllUsers(currentPage, usersPerPage));
  }, [currentPage, dispatch, isLoadingUpdateAuth]);

  const handleActiveSubmit = (e) => {
    e.preventDefault();
    let userId = parseInt(e.target.id.value);
    let roleId = parseInt(e.target.roleId.value);
    dispatch(changeUserAuth(userId, roleId));
  };
  const handleInactiveSubmit = (e) => {
    e.preventDefault();
    let userId = parseInt(e.target.id.value);
    let roleId = parseInt(e.target.roleId.value);
    dispatch(changeUserAuth(userId, roleId));
  };

  return (
    <Dashboard title={"Users"}>
      {isLoadingUpdateAuth && <Loading />}
      <UserAdminTable currentPage={currentPage} usersPerPage={usersPerPage}>
        {allUsers &&
          allUsers.map((user, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {user.id}
              </TableCell>
              <TableCell align="right">{user.fullName}</TableCell>
              <TableCell align="right">{user.userName}</TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">{user.RoleId}</TableCell>
              <TableCell align="right">
                <form onSubmit={handleActiveSubmit} className={"activeForm"}>
                  <input type="hidden" value={user.id} name="id" />
                  <input type="hidden" value="4" name="roleId" />
                  <Button variant="contained" color="primary" type="submit">
                    Active
                  </Button>
                </form>
              </TableCell>
              <TableCell align="right">
                <form
                  onSubmit={handleInactiveSubmit}
                  className={"inactiveForm"}
                >
                  <input type="hidden" value={user.id} name="id" />
                  <input type="hidden" value="3" name="roleId" />
                  <Button variant="contained" color="primary" type="submit">
                    Inactive
                  </Button>
                </form>
              </TableCell>
            </TableRow>
          ))}
      </UserAdminTable>
    </Dashboard>
  );
}

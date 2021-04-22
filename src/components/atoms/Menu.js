import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import HomeIcon from "@material-ui/icons/Home";
import AddBoxIcon from "@material-ui/icons/AddBox";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/reducers/authSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "transparent",
    position: "fixed",
    right: 0,
    bottom: 0,
  },
  menuItem: {
    "&:not(:last-child)": {
      marginBottom: theme.spacing(1),
    },
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

export default function SimpleMenu() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth.user);
  const id = user.user.id;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    history.push("/signin");
  };

  return (
    <div className={classes.root}>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        選單
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={handleClose}
          component={Link}
          to="/"
          className={classes.menuItem}
        >
          <HomeIcon color="primary" className={classes.icon} />
          首頁
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          component={Link}
          to="/newpost"
          className={classes.menuItem}
        >
          <AddBoxIcon color="primary" className={classes.icon} />
          新增貼文
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          component={Link}
          to="/iprice"
          className={classes.menuItem}
        >
          <AttachMoneyIcon color="primary" className={classes.icon} />
          iPrice
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          component={Link}
          to={`/account/${id}`}
          className={classes.menuItem}
        >
          <AccountCircleIcon color="primary" className={classes.icon} />
          關於我
        </MenuItem>
        {user.user.RoleId === 1 && (
          <MenuItem
            onClick={handleClose}
            component={Link}
            to="/admin/users"
            className={classes.menuItem}
          >
            <SupervisedUserCircleIcon
              color="primary"
              className={classes.icon}
            />
            用戶管理
          </MenuItem>
        )}
        <MenuItem onClick={handleLogout} className={classes.menuItem}>
          <ExitToAppIcon color="primary" className={classes.icon} />
          登出
        </MenuItem>
      </Menu>
    </div>
  );
}

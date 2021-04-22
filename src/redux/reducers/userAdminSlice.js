import { createSlice } from "@reduxjs/toolkit";
import {
  getAllUserAPI,
  changeUserAuthAPI,
  getTotalUserCountAPI,
} from "../../services/userAdminAPI";

export const userAdminSlice = createSlice({
  name: "userAdmin",
  initialState: {
    allUsers: [],
    userAuth: "",
    alertMsg: null,
    isLoadingUpdateAuth: false,
    currentPage: 1,
    totalCount: null,
  },
  reducers: {
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    setUserAuth: (state, action) => {
      state.userAuth = action.payload;
    },
    setAlertMsg: (state, action) => {
      state.alertMsg = action.payload;
    },
    setIsLoadingUpdateAuth: (state, action) => {
      state.isLoadingUpdateAuth = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalCount: (state, action) => {
      state.totalCount = action.payload;
    },
  },
});

export const {
  setAllUsers,
  setUserAuth,
  setAlertMsg,
  setIsLoadingUpdateAuth,
  setCurrentPage,
  setTotalCount,
} = userAdminSlice.actions;

export const getTotalCounut = () => (dispatch) => {
  getTotalUserCountAPI().then((res) => {
    if (res.success === false) {
      dispatch(setAlertMsg(res.message));
      return;
    }
    dispatch(setTotalCount(res.usersCount));
  });
};

export const getAllUsers = (page, limit) => (dispatch) => {
  getAllUserAPI(page, limit).then((res) => {
    if (res.success === false) {
      dispatch(setAlertMsg(res.message));
      return;
    }
    dispatch(setAllUsers(res));
  });
};

export const changeUserAuth = (id, roleId) => (dispatch) => {
  dispatch(setIsLoadingUpdateAuth(true));
  changeUserAuthAPI(id, roleId).then((res) => {
    dispatch(setIsLoadingUpdateAuth(false));
    if (res.success === false) {
      dispatch(setAlertMsg(res.message));
      return;
    }
    dispatch(setUserAuth(res));
    return res.message;
  });
};

export const selectIsLoadingUpdateAuth = (state) =>
  state.userAdmin.isLoadingUpdateAuth;
export const selectAllUsers = (state) => state.userAdmin.allUsers;
export const selectAlertMsg = (state) => state.userAdmin.alertMsg;
export const selectCurrentPage = (state) => state.userAdmin.currentPage;
export const selectTotalCount = (state) => state.userAdmin.totalCount;
export default userAdminSlice.reducer;

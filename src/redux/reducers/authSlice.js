import { createSlice } from "@reduxjs/toolkit";
import { getAuthToken, setAuthToken } from "../../utlis";
import { registerAPI, loginAPI, getMeAPI } from "../../services/authAPI";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    alertMsg: null,
    isLoadingUser: false,
  },
  reducers: {
    setUsers: (state, action) => {
      state.user = action.payload;
    },
    setAlertMsg: (state, action) => {
      state.alertMsg = action.payload;
    },
    setIsLoadingUser: (state, action) => {
      state.isLoadingUser = action.payload;
    },
    setLogout: (state) => {
      state.user = null;
    },
  },
});

export const {
  setUsers,
  setAlertMsg,
  setIsLoadingUser,
  setLogout,
} = authSlice.actions;

export const getCurrentUser = () => (dispatch) => {
  dispatch(setIsLoadingUser(true));
  if (getAuthToken()) {
    return getMeAPI().then((res) => {
      dispatch(setIsLoadingUser(false));
      if (res.success !== true) {
        setAuthToken(null);
        return;
      }
      dispatch(setUsers(res));
      return res;
    });
  }
  dispatch(setIsLoadingUser(false));
};

export const login = (email, password) => (dispatch) => {
  dispatch(setIsLoadingUser(true));
  return loginAPI(email, password).then((res) => {
    if (res.success !== true) {
      dispatch(setAlertMsg(res.message));
      dispatch(setIsLoadingUser(false));
      return;
    }
    setAuthToken(res.token);
    return dispatch(getCurrentUser());
  });
};

export const register = (fullName, userName, email, password, RoleId) => (
  dispatch
) => {
  dispatch(setIsLoadingUser(true));
  return registerAPI(fullName, userName, email, password, RoleId).then(
    (res) => {
      if (res.success !== true) {
        dispatch(setAlertMsg(res.message));
        dispatch(setIsLoadingUser(false));
        return;
      }
      setAuthToken(res.token);
      return dispatch(getCurrentUser());
    }
  );
};

export const logout = () => (dispatch) => {
  setAuthToken("");
  dispatch(setLogout());
};

export const selectUser = (state) => state.auth.user;
export const selectAlertMsg = (state) => state.auth.alertMsg;
export const selectIsLoadingUser = (state) => state.auth.isLoadingUser;

export default authSlice.reducer;

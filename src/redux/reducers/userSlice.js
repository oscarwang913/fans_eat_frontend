import { createSlice } from "@reduxjs/toolkit";
import { updateUserInfoAPI } from "../../services/userAPI";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userNewInfo: "",
    alertMsg: null,
    isLoadingUpdate: false,
  },
  reducers: {
    setUserNewInfo: (state, action) => {
      state.userNewInfo = action.payload;
    },
    setAlertMsg: (state, action) => {
      state.alertMsg = action.payload;
    },
    setIsLoadingUpdate: (state, action) => {
      state.isLoadingUpdate = action.payload;
    },
  },
});

export const {
  setUserNewInfo,
  setAlertMsg,
  setIsLoadingUpdate,
} = userSlice.actions;

export const updateUserInfo = (fullName, userName, email, id) => (dispatch) => {
  dispatch(setIsLoadingUpdate(true));
  return updateUserInfoAPI(fullName, userName, email, id).then((res) => {
    dispatch(setIsLoadingUpdate(false));
    if (res.success === false) {
      dispatch(setAlertMsg(res.message));
      return;
    }
    dispatch(setUserNewInfo(res));
    return res;
  });
};

export const selectIsLoadingUpdate = (state) => state.user.isLoadingUpdate;
export const selectUserNewInfo = (state) => state.user.userNewInfo;
export const selectAlertMsg = (state) => state.user.alertMsg;
export default userSlice.reducer;

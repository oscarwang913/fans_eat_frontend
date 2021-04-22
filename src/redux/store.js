import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import userSlice from "./reducers/userSlice";
import postSlice from "./reducers/postSlice";
import cropSlice from "./reducers/cropSlice";
import userAdminSlice from "./reducers/userAdminSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    post: postSlice,
    crop: cropSlice,
    userAdmin: userAdminSlice,
  },
});

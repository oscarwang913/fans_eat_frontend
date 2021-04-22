import { createSlice } from "@reduxjs/toolkit";
import { getCropAPI } from "../../services/cropAPI";

export const cropSlice = createSlice({
  name: "crop",
  initialState: {
    crop: [],
  },
  reducers: {
    setCrop: (state, action) => {
      state.crop = action.payload;
    },
  },
});

export const { setCrop } = cropSlice.actions;

export const getCrop = (startDate, endDate, cropName, marketName) => (
  dispatch
) => {
  return getCropAPI(startDate, endDate, cropName, marketName)
    .then((data) => {
      dispatch(setCrop(data.Data));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const selectCrop = (state) => state.crop.crop;

export default cropSlice.reducer;

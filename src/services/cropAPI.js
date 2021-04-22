import { CROP_URL, CROP_API_KEY } from "./apiURL";

export const getCropAPI = (startDate, endDate, cropName, marketName) => {
  return fetch(
    `${CROP_URL}?Start_time=${startDate}&End_time=${endDate}&CropName=${cropName}&MarketName=${marketName}&api_key=${CROP_API_KEY}`
  ).then((res) => res.json());
};

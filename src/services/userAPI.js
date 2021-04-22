import { BASE_URL } from "./apiURL";
import { getAuthToken } from "../utlis";

export const getUserInfoAPI = (id) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/users/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const updateUserInfoAPI = (fullName, userName, email, id) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/users/${id}`, {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      fullName,
      userName,
      email,
    }),
  }).then((res) => res.json());
};

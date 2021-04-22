import { getAuthToken } from "../utlis";
import { BASE_URL } from "./apiURL";

export const getAllUserAPI = (page, limit) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/admin/users/?limit=${limit}&page=${page}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const getTotalUserCountAPI = () => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/admin/users/count`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const changeUserAuthAPI = (id, roleId) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/admin/users`, {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      id,
      roleId,
    }),
  }).then((res) => res.json());
};

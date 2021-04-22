import { getAuthToken } from "../utlis";
import { BASE_URL } from "./apiURL";

export const registerAPI = (fullName, userName, email, password, RoleId) => {
  return fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      fullName,
      userName,
      email,
      password,
      RoleId,
    }),
  }).then((res) => res.json());
};

export const loginAPI = (email, password) => {
  return fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then((res) => res.json());
};

export const getMeAPI = () => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/auth/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

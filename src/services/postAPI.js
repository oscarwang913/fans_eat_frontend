import { getAuthToken } from "../utlis";
import { BASE_URL } from "./apiURL";

export const getAllPostsAPI = (page, limit) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/posts/?limit=${limit}&page=${page}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const getPostByIdAPI = (id) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/posts/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const createPostAPI = (content, file, userId) => {
  const token = getAuthToken();
  const formData = new FormData();
  formData.append("content", content);
  formData.append("image", file);
  formData.append("UserId", userId);
  return fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: formData,
  }).then((res) => res.json());
};
export const getAllOwnPostsAPI = (id) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/posts/all/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const getAllLikedPostsAPI = () => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/likes`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const createPostLikeAPI = (postId) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/likes`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      postId: postId,
    }),
  }).then((res) => res.json());
};

export const getTotalPostCountAPI = () => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/posts/count`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

const BASE_URL = import.meta.env.VITE_API_URL;

// helper
const request = async (url, options = {}) => {
  const res = await fetch(`${BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const data = await res.json();
  if (!res.ok) throw data;
  return data;
};

// ===== AUTH =====
export const login = (body) =>
  request("/users/login", {
    method: "POST",
    body: JSON.stringify(body),
  });

// ===== USERS =====
export const getUsers = () => request("/users");
export const createUser = (body) =>
  request("/users", { method: "POST", body: JSON.stringify(body) });
export const updateUser = (id, body) =>
  request(`/users/${id}`, { method: "PUT", body: JSON.stringify(body) });
export const deleteUser = (id) =>
  request(`/users/${id}`, { method: "DELETE" });

// ADMIN
export const banUser = (id) =>
  request(`/admin/users/${id}/ban`, { method: "PUT" });

export const unbanUser = (id) =>
  request(`/admin/users/${id}/unban`, { method: "PUT" });

export const getStats = (token) =>
  request(`/admin/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// ===== POSTS =====
export const getPosts = () => request("/posts");
export const createPost = (body) =>
  request("/posts", { method: "POST", body: JSON.stringify(body) });
export const updatePost = (id, body) =>
  request(`/posts/${id}`, { method: "PUT", body: JSON.stringify(body) });
export const deletePost = (id) =>
  request(`/posts/${id}`, { method: "DELETE" });

// ===== COMMENTS =====
export const getComments = () => request("/comments");
export const deleteComment = (id) =>
  request(`/comments/${id}`, { method: "DELETE" });

// ===== TAGS =====
export const getTags = () => request("/tags");
export const createTag = (body) =>
  request("/tags", { method: "POST", body: JSON.stringify(body) });
export const updateTag = (id, body) =>
  request(`/tags/${id}`, { method: "PUT", body: JSON.stringify(body) });
export const deleteTag = (id) =>
  request(`/tags/${id}`, { method: "DELETE" });
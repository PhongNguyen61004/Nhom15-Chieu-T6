import axios from "axios";

const API = "https://xdpm-web-azqx.vercel.app";

const instance = axios.create({
  baseURL: API,
});

// ✅ FIX HEADER
instance.interceptors.request.use((config) => {
  const userId = localStorage.getItem("userId");
  if (userId) {
    config.headers["x-user-id"] = user
    Id;
  }
  return config;
});

// ================= USER =================
export const userAPI = {
  getAllUsers: () => instance.get("/users"),

  createUser: (data) => instance.post("/users", data),

  deleteUser: (id) => instance.delete(`/users/${id}`),

  updateUser: (id, data) => instance.put(`/users/${id}`, data),
};

// ================= COMMENT =================
export const commentAPI = {
  getAll: () => instance.get("/comments"),

  delete: (id) => instance.delete(`/comments/${id}`),
};

// ================= ROLE =================
export const roleAPI = {
  getAll: () => instance.get("/roles"),

  assignRole: (userId, role) =>
    instance.put(`/roles/assign/${userId}`, { role }),
};
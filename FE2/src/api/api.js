import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const API = {
  users: {
    getAll: () => api.get("/users"),
    getById: (id) => api.get(`/users/${id}`),
    create: (data) => api.post("/users", data),
    update: (id, data) => api.put(`/users/${id}`, data),
    delete: (id) => api.delete(`/users/${id}`),
  },

  roles: {
    getAll: () => api.get("/roles"),
    assign: (userId, role) =>
      api.put(`/roles/assign/${userId}`, { role }),
  },

  posts: {
    getAll: () => api.get("/posts"),
    create: (data) => api.post("/posts", data),
    update: (id, data) => api.put(`/posts/${id}`, data),
    delete: (id) => api.delete(`/posts/${id}`),
  },

  comments: {
    getAll: () => api.get("/comments"),
    delete: (id) => api.delete(`/comments/${id}`),
  },

  admin: {
    stats: () => api.get("/admin/stats"),
  },
};

export default API;
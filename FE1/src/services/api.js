
const BASE_URL = "https://nhom15-chieu-t6.onrender.com/api";

function getCookie(name) {
  return document.cookie
    .split("; ")
    .find(row => row.startsWith(name + "="))
    ?.split("=")[1];
}

async function request(path, options = {}) {
  const token = getCookie("access_token");

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };


  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    credentials: "include",
    ...options,
    headers,
  });

  if (!res.ok) {
    let message = `API error ${res.status}: ${path}`;
    try {
      const data = await res.json();
      if (data?.message) message = data.message;
    } catch { }
    throw new Error(message);
  }
  if (res.status === 204) return null;


  return res.json();
}

let cachedProfile = null;

// ─── AUTH ─────────────────────────────────────────────────────
export const authService = {
  register: (data) =>
    request("/User/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  login: (data) =>
    request("/User/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  logout: () =>
    request("/User/logout", {
      method: "POST",
    }),
};

// ─── USERS ────────────────────────────────────────────────────
export const userService = {
  getById: (id) => request(`/User/${id}`),

  getByUsername: (username) =>
    request(`/User/username/${username}`),


  getProfile: async () => {
    if (cachedProfile) return cachedProfile;

    const data = await request("/users/profile");
    cachedProfile = data;
    return data;
  },

  // optional: clear cache khi logout
  clearCache: () => {
    cachedProfile = null;
  },
};

// ─── POSTS ────────────────────────────────────────────────────
export const postService = {
  getAll: () => request("/posts"),

  getById: (id) => request(`/posts/${id}`),

  create: (data) =>
    request("/posts", {
      method: "POST",
      headers: {
        authorId: data.authorId,
      },
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    request(`/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    request(`/posts/${id}`, {
      method: "DELETE",
    }),

  getByAuthor: async () => {
    const profile = await userService.getProfile();

    if (!profile?.id) {
      throw new Error("User not authenticated");
    }

    return request(`/posts/author/${profile.id}`);
  },
};

// ─── COMMENTS ─────────────────────────────────────────────────
export const commentService = {
  getByPost: (postId) => request(`/comments/post/${postId}`),

  getById: (id) => request(`/comments/${id}`),

  create: (data) =>
    request("/comments", {
      method: "POST",
      headers: {
        authorId: data.authorId,
      },
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    request(`/comments/${id}`, {
      method: "PUT",
      headers: {
        authorId: data.authorId,
      },
      body: JSON.stringify(data),
    }),

  delete: (id, authorId) =>
    request(`/comments/${id}`, {
      method: "DELETE",
      headers: {
        authorId: authorId,
      },
    }),
};
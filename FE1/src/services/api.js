const BASE_URL = "http://localhost:3000";

async function request(path, options = {}) {
  
  const cleanPath = path.startsWith("/")
    ? path.slice(1)
    : path;

  const res = await fetch(`${BASE_URL}/api/${cleanPath}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  return res.json();
}

let cachedProfile = null;

// ─── AUTH ──────
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
  request("/auth/logout", {
    method: "POST",
  }),
};

// ─── USERS ───────
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

  // clear cache khi logout
  clearCache: () => {
    cachedProfile = null;
  },
};

// ─── POSTS ────
export const postService = {
  getAll: () => request("/posts"),

  getById: (id) => request(`/posts/${id}`),

  create: (data) => {
  const { authorId, ...safeData } = data; 

  return request("/posts", {
    method: "POST",
    body: JSON.stringify(safeData),
  });
},

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

// ─── COMMENTS ───────
export const commentService = {
  getByPost: (postId) => request(`/comments/post/${postId}`),

  getById: (id) => request(`/comments/${id}`),

  create: (data) => {
  const { authorId, ...safeData } = data; 

  return request("/comments", {
    method: "POST",
    body: JSON.stringify(safeData),
  });
},

  update: (id, data) =>
    request(`/comments/${id}`, {
      method: "PUT",body: JSON.stringify(data),
    }),

 delete: (id) =>
  request(`/comments/${id}`, {
    method: "DELETE",
  }),
};
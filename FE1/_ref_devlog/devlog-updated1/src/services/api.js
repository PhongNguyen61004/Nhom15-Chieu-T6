// ─── API SERVICE LAYER ────────────────────────────────────────────────────────
import { MOCK_POSTS, MOCK_COMMENTS } from "../constants/mockData";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";
const DEMO_AUTHOR_ID = "670000000000000000000010";

function minutesFromReadTime(readTime) {
  const match = String(readTime || "").match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function normalizeMockPost(post, index = 0) {
  const now = Date.now();
  return {
    id: post.id,
    title: post.title,
    content: post.excerpt || "",
    coverImage: "",
    tags: (post.tags || []).map((t) => (typeof t === "string" ? t : t.label)).filter(Boolean),
    viewsCount: post.viewsCount ?? (post.upvotes || 0) * 3,
    likesCount: post.likesCount ?? post.upvotes ?? 0,
    commentsCount: post.commentsCount ?? post.comments ?? 0,
    readingTime: post.readingTime ?? minutesFromReadTime(post.readTime),
    publishedAt: post.publishedAt || new Date(now - index * 86400000).toISOString(),
    authorId: post.authorId || `mock-author-${post.id}`,
  };
}

function getMockPosts() {
  return MOCK_POSTS.map((post, index) => normalizeMockPost(post, index));
}

function getMockComments(postId) {
  return MOCK_COMMENTS.map((comment, index) => ({
    id: Number(`${postId}${index + 1}`),
    postId,
    authorId: comment.author || "mock-user",
    content: comment.text || "",
    likesCount: comment.upvotes || 0,
    createdAt: new Date(Date.now() - (index + 1) * 3600000).toISOString(),
    isEdited: false,
  }));
}

function getToken() {
  return localStorage.getItem("token");
}

function getCurrentUserId() {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.id && /^[a-fA-F0-9]{24}$/.test(String(user.id))) return String(user.id);
  } catch {}
  return DEMO_AUTHOR_ID;
}

async function request(path, options = {}) {
  const token = getToken();
  const extraHeaders = options.headers || {};
  const { headers: _ignored, ...restOptions } = options;
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...extraHeaders,
    },
    ...restOptions,
  });
  if (!res.ok) {
    let message = `API error ${res.status}: ${path}`;
    try {
      const payload = await res.json();
      if (payload?.message) message = payload.message;
    } catch {}
    throw new Error(message);
  }
  return res.json();
}

// ─── Auth ────────────────────────────────────────────────────────────────────
export const authService = {
  register: (data) =>
    request("/User/register", { method: "POST", body: JSON.stringify(data) }),

  login: (data) =>
    request("/User/login", { method: "POST", body: JSON.stringify(data) }),
};

// ─── Users ───────────────────────────────────────────────────────────────────
export const userService = {
  getById: (id) => request(`/User/${id}`),
  getByUsername: (username) => request(`/User/username/${username}`),
};

// ─── Posts ───────────────────────────────────────────────────────────────────
export const postService = {
  getAll: async () => {
    try {
      return await request("/posts");
    } catch {
      return getMockPosts();
    }
  },
  getById: async (id) => {
    try {
      return await request(`/posts/${id}`);
    } catch {
      return getMockPosts().find((post) => String(post.id) === String(id)) || null;
    }
  },
  create: (data) =>
    request("/posts", {
      method: "POST",
      headers: { authorId: getCurrentUserId() },
      body: JSON.stringify(data),
    }),
  update: (id, data) =>
    request(`/posts/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id) =>
    request(`/posts/${id}`, { method: "DELETE" }),
  getByAuthor: async (authorId) => {
    try {
      return await request(`/posts/author/${authorId}`);
    } catch {
      const mockPosts = getMockPosts();
      if (!authorId || String(authorId) === "guest-devlog") return mockPosts;
      return mockPosts.filter((post) => String(post.authorId) === String(authorId));
    }
  },
};

// ─── Comments ────────────────────────────────────────────────────────────────
export const commentService = {
  getByPost: async (postId) => {
    try {
      return await request(`/comments/post/${postId}`);
    } catch {
      return getMockComments(postId);
    }
  },
  getById: (id) => request(`/comments/${id}`),
  create: (data) =>
    request("/comments", {
      method: "POST",
      headers: { authorId: getCurrentUserId() },
      body: JSON.stringify(data),
    }),
  update: (id, data) =>
    request(`/comments/${id}`, {
      method: "PUT",
      headers: { authorId: getCurrentUserId() },
      body: JSON.stringify(data),
    }),
  delete: (id, authorId) =>
    request(`/comments/${id}`, {
      method: "DELETE",
      headers: { authorId: authorId || getCurrentUserId() },
    }),
};

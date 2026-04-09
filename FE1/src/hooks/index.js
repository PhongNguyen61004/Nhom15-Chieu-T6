// ─── CUSTOM HOOKS ────────────────────────────────────────────────────────────
import { useState, useEffect, useCallback } from "react";
import { postService, commentService, authService } from "../services/api";

const TEMP_GUEST_USER = {
  id: "guest-devlog",
  username: "guest",
  name: "Guest User",
  initials: "GU",
  gradient: "from-green-400 to-cyan-400",
  bio: "Temporary guest mode while auth backend is unavailable.",
};

function getStoredUserOrGuest() {
  try {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (stored && typeof stored === "object") return stored;
  } catch {}
  return TEMP_GUEST_USER;
}

// ─── Generic fetch hook ───────────────────────────────────────────────────────
function useFetch(fetchFn, deps = []) {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, deps); // eslint-disable-line

  useEffect(() => { load(); }, [load]);

  return { data, loading, error, refetch: load };
}

// ─── Auth ────────────────────────────────────────────────────────────────────
export function useAuth() {
  const [user, setUser] = useState(() => getStoredUserOrGuest());
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  async function login(email, password) {
    setLoading(true); setError(null);
    try {
      const res = await authService.login({ email, password });
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      setUser(res.user);
      return res.user;
    } catch (err) {
      setError("Đăng nhập thất bại. Kiểm tra lại email/password.");
    } finally {
      setLoading(false);
    }
  }

  async function register(data) {
    setLoading(true); setError(null);
    try {
      const res = await authService.register(data);
      return res.user;
    } catch (err) {
      setError("Đăng ký thất bại. Email hoặc username đã tồn tại.");
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }

  return { user, loading, error, login, register, logout };
}

// ─── Current User ─────────────────────────────────────────────────────────────
export function useCurrentUser() {
  const [user] = useState(() => getStoredUserOrGuest());
  return { user, loading: false };
}

// ─── Posts ───────────────────────────────────────────────────────────────────
export function usePosts() {
  const { data, loading, error, refetch } = useFetch(() => postService.getAll(), []);
  const posts = data || [];

  async function toggleLike(postId) {
    // API chưa có endpoint like, để placeholder
    console.log("like post", postId);
  }

  async function savePost(postId) {
    console.log("save post", postId);
  }

  return { posts, loading, error, toggleLike, savePost, refetch };
}

export function usePost(id) {
  const { data: post, loading, error } = useFetch(() => postService.getById(id), [id]);
  return { post, loading, error };
}

export function useAuthorPosts(authorId) {
  const { data, loading, error } = useFetch(
    () => authorId ? postService.getByAuthor(authorId) : Promise.resolve([]),
    [authorId]
  );
  return { posts: data || [], loading, error };
}

// ─── Comments ────────────────────────────────────────────────────────────────
export function useComments(postId) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading]   = useState(true);

  const loadComments = useCallback(async () => {
    if (!postId) return;
    setLoading(true);
    try {
      const data = await commentService.getByPost(postId);
      setComments(data);
    } catch (err) {
      setComments([]);
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => { loadComments(); }, [loadComments]);

  async function addComment(text, parentId = null) {
    const currentUser = getStoredUserOrGuest();
    if (!currentUser) return;
    try {
      const newComment = await commentService.create({
        postId,
        content: text,
        ...(parentId ? { parentId } : {}),
      });
      setComments(prev => [...prev, newComment]);
    } catch (err) {
      console.error("Lỗi tạo comment", err);
    }
  }

  async function deleteComment(commentId) {
    const currentUser = getStoredUserOrGuest();
    if (!currentUser) return;
    try {
      await commentService.delete(commentId, currentUser.id);
      setComments(prev => prev.filter(c => c.id !== commentId));
    } catch (err) {
      console.error("Lỗi xoá comment", err);
    }
  }

  function likeComment(commentId) {
    // API chưa có endpoint like comment
    setComments(prev =>
      prev.map(c => c.id !== commentId ? c : { ...c, likesCount: (c.likesCount || 0) + 1 })
    );
  }

  return { comments, loading, addComment, deleteComment, likeComment };
}

// ─── Post Editor ──────────────────────────────────────────────────────────────
export function usePostEditor(onSuccess) {
  const [title,      setTitle]      = useState("");
  const [body,       setBody]       = useState("");
  const [tags,       setTags]       = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [publishing, setPublishing] = useState(false);
  const [error,      setError]      = useState(null);

  async function publish() {
    if (!title.trim() || !body.trim()) {
      setError("Tiêu đề và nội dung không được để trống.");
      return;
    }
    const currentUser = getStoredUserOrGuest();
    if (!currentUser) { setError("Bạn chưa đăng nhập."); return; }

    setPublishing(true);
    setError(null);
    try {
      await postService.create({
        title,
        content: body,
        coverImage: coverImage.trim() || "https://picsum.photos/seed/devlog/800/400",
        tags: tags.split(",").map(t => t.trim()).filter(Boolean),
        status: "published",
      });
      onSuccess?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setPublishing(false);
    }
  }

  return { title, setTitle, body, setBody, tags, setTags, coverImage, setCoverImage, publishing, error, publish };
}

// ─── Notifications (mock — API chưa có) ──────────────────────────────────────
export function useNotifications() {
  const [notifs] = useState([]);
  const unreadCount = 0;
  function markAllRead() {}
  function markRead() {}
  return { notifs, unreadCount, markAllRead, markRead };
}

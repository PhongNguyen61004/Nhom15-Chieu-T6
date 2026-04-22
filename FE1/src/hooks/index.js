import { useState, useEffect, useCallback } from "react";
import {
  postService,
  commentService,
  authService,
  userService,
} from "../services/api";

// ─── Generic fetch hook ─────────────────────────────────────────────
function useFetch(fetchFn, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }, deps);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, refetch: load };
}

// ─── AUTH ───────────────────────────────────────────────────────────
export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function login(email, password) {
    setLoading(true);
    setError(null);

    try {
      await authService.login({
        UsernameOrEmail: email,
        Password: password,
      });


      const me = await userService.getProfile();

      setUser(me);
      return me;
    } catch (err) {
      setError("Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await fetch("/api/User/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  }

  return { user, loading, error, login, logout };
}

// ─── CURRENT USER ───────────────────────────────────────────────────
export function useCurrentUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userService.getProfile()
      .then((data) => {

        setUser({
          id: data.id,
          name: data.name || data.username,
          handle: "@" + data.username,
          bio: data.bio,
          avatar: data.avatar,
          joinedAt: data.createdAt,

          stats: {
            posts: 0,
            followers: data.followersCount,
            following: data.followingCount,
            upvotes: 0
          },

          skills: [],
          initials: data.name?.charAt(0)?.toUpperCase()
        });
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  return { user, loading };
}

// ─── POSTS ──────────────────────────────────────────────────────────
export function usePosts() {
  const { data, loading, error, refetch } = useFetch(
    () => postService.getAll(),
    []
  );

  return {
    posts: data || [],
    loading,
    error,
    refetch,
    toggleLike: (id) => console.log("like", id),
    savePost: (id) => console.log("save", id),
  };
}

export function usePost(id) {
  const { data, loading, error } = useFetch(
    () => postService.getById(id),
    [id]
  );

  return { post: data, loading, error };
}

export function useAuthorPosts() {
  const { data, loading, error } = useFetch(
    () => postService.getByAuthor(),
    []
  );

  return { posts: data || [], loading, error };
}

// ─── COMMENTS ───────────────────────────────────────────────────────
export function useComments(postId) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!postId) return;

    setLoading(true);

    try {
      const data = await commentService.getByPost(postId);
      const mapped = (data || []).map(c => ({
        ...c,
        id: c.id || c._id, 
      }));

      setComments(mapped);
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    load();
  }, [load]);

  async function addComment(text, parentId = null) {
    const profile = await userService.getProfile();

    const newComment = await commentService.create({
      postId,
      content: text,
      authorId: profile.id,
    });

    setComments((prev) => [...prev, newComment]);
  }

  async function deleteComment(commentId) {
    const profile = await userService.getProfile();

    await commentService.delete(commentId, profile.id);
    setComments((prev) => prev.filter((c) => (c.id || c._id) !== commentId));
  }

  function likeComment(commentId) {
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId
          ? { ...c, likesCount: (c.likesCount || 0) + 1 }
          : c
      )
    );
  }

  return { comments, loading, addComment, deleteComment, likeComment };
}

// ─── POST EDITOR ────────────────────────────────────────────────────
export function usePostEditor(onSuccess) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState(null);

  async function publish() {

    if (!title.trim() || !body.trim()) {
      setError("Tiêu đề và nội dung không được để trống.");
      return;
    }

    setPublishing(true);
    setError(null);

    try {
      const profile = await userService.getProfile();
      console.log(profile)
      await postService.create({
        title: title.trim(),
        content: body.trim(),
        coverImage: coverImage?.trim() || "",
        tags: tags ? tags.split(",").map(t => t.trim()).filter(Boolean) : [],
        authorId: profile.id,
        status: "published",
      });

      onSuccess?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setPublishing(false);
    }
  }

  return {
    title,
    setTitle,
    body,
    setBody,
    tags,
    setTags,
    coverImage,
    setCoverImage,
    publishing,
    error,
    publish,
  };
}

// ─── NOTIFICATIONS ──────────────────────────────────────────────────
export function useNotifications() {
  return {
    notifs: [],
    unreadCount: 0,
    markAllRead: () => { },
    markRead: () => { },
  };
}
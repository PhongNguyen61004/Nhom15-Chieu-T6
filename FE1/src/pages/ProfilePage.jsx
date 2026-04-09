// ─── PROFILE PAGE ────────────────────────────────────────────────────────────
import { useCurrentUser, useAuthorPosts } from "../hooks";

export default function ProfilePage({ onOpenPost }) {
  const { user } = useCurrentUser();
  const { posts, loading } = useAuthorPosts(user?.id);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  }

  return (
    <div className="p-4 max-w-2xl">
      {/* Profile card */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="text-lg font-semibold text-zinc-100">{user?.name || user?.username}</div>
            <div className="font-mono text-xs text-zinc-500">@{user?.username}</div>
          </div>
          <button
            onClick={logout}
            className="font-mono text-xs text-zinc-500 hover:text-red-400 border border-zinc-700 px-3 py-1.5 rounded-md transition-colors"
          >
            logout
          </button>
        </div>
        {user?.bio && <p className="text-sm text-zinc-400 mb-3">{user.bio}</p>}
        <div className="flex gap-4 font-mono text-xs text-zinc-500">
          <span>👥 {user?.followersCount || 0} followers</span>
          <span>{user?.followingCount || 0} following</span>
          {user?.location && <span>📍 {user.location}</span>}
        </div>
      </div>

      <p className="font-mono text-xs text-zinc-500 mb-3">// my posts</p>

      {loading && <p className="font-mono text-xs text-zinc-500">// loading...</p>}

      <div className="space-y-3">
        {posts.map(post => (
          <div
            key={post.id}
            onClick={() => onOpenPost(post)}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 cursor-pointer hover:border-zinc-700 transition-colors"
          >
            <h3 className="text-sm font-medium text-zinc-100 mb-1">{post.title}</h3>
            <div className="flex gap-3 font-mono text-[11px] text-zinc-500">
              <span>👁 {post.viewsCount}</span>
              <span>❤️ {post.likesCount}</span>
              <span>💬 {post.commentsCount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

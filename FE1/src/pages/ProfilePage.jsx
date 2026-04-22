import "./ProfilePage.css";
import { useCurrentUser, useAuthorPosts } from "../hooks";

export default function ProfilePage({ onOpenPost }) {
  const { user, loading: userLoading } = useCurrentUser();
  const { posts = [], loading: postLoading } = useAuthorPosts();

  async function logout() {
    try {
      await fetch("/api/User/logout", {
        method: "POST",
        credentials: "include",
      });
    } finally {
      window.location.reload();
    }
  }

  if (userLoading) {
    return <div className="profile-state"> loading profile...</div>;
  }

  if (!user) {
    return <div className="profile-state"> not logged in</div>;
  }

  return (
    <div className="profile-container">
      {/* PROFILE CARD */}
      <div className="profile-card">
        <div className="profile-header">
          <div>
            <div className="profile-name">
              {user.name || user.username || "Unknown"}
            </div>

            <div className="profile-username">
              @{user.username || "user"}
            </div>
          </div>

          <button onClick={logout} className="profile-logout">
            logout
          </button>
        </div>

        {user.bio && (
          <p className="profile-bio">{user.bio}</p>
        )}

        <div className="profile-stats">
          <span>👥 {user.stats?.followers ?? 0} followers</span>
          <span>{user.stats?.following ?? 0} following</span>
          {user.location && <span>📍 {user.location}</span>}
        </div>
      </div>

      {/* POSTS */}
      <p className="profile-section"> my posts</p>

      {postLoading && (
        <p className="profile-state"> loading posts...</p>
      )}

      {!posts.length && !postLoading && (
        <p className="profile-state"> no posts yet</p>
      )}

      <div className="profile-posts">
        {posts.map((post) => (
          <div
            key={post.id}
            onClick={() => onOpenPost?.(post)}
            className="profile-post"
          >
            <h3 className="post-title">
              {post.title || "Untitled"}
            </h3>

            <div className="post-meta">
              <span>👁 {post.viewsCount ?? 0}</span>
              <span>❤️ {post.likesCount ?? 0}</span>
              <span>💬 {post.commentsCount ?? 0}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
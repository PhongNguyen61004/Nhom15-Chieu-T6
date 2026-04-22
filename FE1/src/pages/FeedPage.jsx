import "./FeedPage.css";
import { FaHeart } from "react-icons/fa";
import { FiClock, FiEye, FiMessageCircle } from "react-icons/fi";
import { usePosts } from "../hooks";

export default function FeedPage({ onOpenPost }) {
  const { posts, loading, error } = usePosts();

  if (loading)
    return <div className="feed-state"> loading posts...</div>;

  if (error)
    return <div className="feed-error"> error: {error}</div>;

  if (!posts?.length)
    return <div className="feed-state"> no posts yet</div>;

  return (
    <div className="feed-container">
      <div className="feed-header">
        <p className="feed-title">Latest Stories</p>
        <p className="feed-count">{posts.length} posts</p>
      </div>

      <div className="feed-list">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onOpen={() => onOpenPost?.(post)}
          />
        ))}
      </div>
    </div>
  );
}

// ─── PostCard ─────────────────────────

function PostCard({ post = {}, onOpen }) {
  const tags = Array.isArray(post.tags) ? post.tags : [];

  return (
    <article onClick={onOpen} className="post-card">
      <div className="post-content">
        {tags.length > 0 && (
          <div className="post-tags">
            {tags.slice(0, 4).map((tag, i) => (
              <span key={tag || i} className="tag">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <h2 className="post-title">
          {post.title || "Untitled"}
        </h2>
      </div>

      {post.coverImage && post.coverImage !== "string" && (
        <div className="post-image">
          <img
            src={post.coverImage}
            alt={post.title || ""}
            loading="lazy"
          />
        </div>
      )}

      <div className="post-footer">
        <span>
          <FiEye /> {post.viewsCount ?? 0}
        </span>

        <span>
          <FaHeart className="heart" /> {post.likesCount ?? 0}
        </span>

        <span>
          <FiMessageCircle /> {post.commentsCount ?? 0}
        </span>

        {post.readingTime > 0 && (
          <span>
            <FiClock /> {post.readingTime} min
          </span>
        )}

        <span className="post-date">
          {post.publishedAt
            ? new Date(post.publishedAt).toLocaleDateString("vi-VN")
            : ""}
        </span>
      </div>
    </article>
  );
}
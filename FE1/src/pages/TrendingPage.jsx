import "./TrendingPage.css";
import { useMemo } from "react";
import { usePosts } from "../hooks";
import { SectionLabel } from "../components/ui";

export function TrendingPage({ onOpenPost }) {
  const { posts = [], loading, error } = usePosts();

  const sorted = useMemo(() => {
    return [...posts].sort(
      (a, b) =>
        (b.likesCount ?? b.upvotes ?? 0) -
        (a.likesCount ?? a.upvotes ?? 0)
    );
  }, [posts]);

  if (loading) {
    return <div className="trending-state"> loading...</div>;
  }

  if (error) {
    return <div className="trending-error"> error: {error}</div>;
  }

  if (!sorted.length) {
    return <div className="trending-state"> no trending posts</div>;
  }

  return (
    <div className="trending-container">
      <SectionLabel className="trending-title">
         trending this week
      </SectionLabel>

      <div className="trending-list">
        {sorted.map((post) => {
          const tags = Array.isArray(post.tags)
            ? post.tags
            : post.tags?.split?.(",") ?? [];

          return (
            <div key={post.id} className="trending-item">
              <div
                onClick={() => onOpenPost?.(post)}
                className="trending-card"
              >
                {tags.length > 0 && (
                  <div className="trending-tags">
                    {tags.map((t, i) => (
                      <span key={t || i} className="tag">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}

                <h2 className="trending-post-title">
                  {post.title || "Untitled"}
                </h2>

                <div className="trending-meta">
                  <span>
                    likes {post.likesCount ?? post.upvotes ?? 0}
                  </span>

                  <span>
                    comments {post.commentsCount ?? post.comments ?? 0}
                  </span>

                  <span className="date">
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString("vi-VN")
                      : ""}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
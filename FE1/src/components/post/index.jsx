import "./index.css";
import { useState } from "react";
import { Avatar, TagList, CodeBlock, Card, SectionLabel, EmptyState, LoadingSpinner } from "../ui";

// ─── PostCard ───────────────────────────

export function PostCard({ post, onOpen, onLike, onSave }) {
  const [liked, setLiked] = useState(!!post.liked);
  const [votes, setVotes] = useState( post.upvotes ?? post.likesCount ?? 0);
  const author = post?.author || {  name: post.authorName, initials: post.authorName?.charAt(0)?.toUpperCase()};
  const timeAgo = post.timeAgo || "recently";


  function handleLike(e) {
    e.stopPropagation();
    const next = !liked;
    setLiked(next);
    setVotes(next ? votes + 1 : votes - 1);
    onLike?.(post.id);
  }

  function handleSave(e) {
    e.stopPropagation();
    onSave?.(post.id);
  }

  return (
    <Card hover onClick={() => onOpen(post)} className="post-card">
      {/* Author */}
      <div className="post-author">
        <Avatar initials={author.initials || author.name?.charAt(0)?.toUpperCase() || "U"}
          gradient={author.gradient || "from-gray-500 to-gray-700"} />
        <div>
          <div className="post-author-name">
            {author.name || "Unknown"}
          </div>
          <div className="post-meta">
            {timeAgo} · {post.readTime}
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="post-title">{post.title}</div>
      <div className="post-excerpt"> {post.excerpt || post.content?.slice(0, 120) || ""}</div>

      {/* Code */}
      {post.code && (
        <div className="post-code">
          <CodeBlock lang={post.code.lang} snippet={post.code.snippet} />
        </div>
      )}

      {/* Tags */}
      <div className="post-tags">
        <TagList tags={post.tags} />
      </div>

      {/* Footer */}
      <div className="post-footer">
        <button
          onClick={handleLike}
          className={`post-btn ${liked ? "liked" : ""}`}
        >
          ▲ {votes}
        </button>

        <span className="post-info">◎ {post.comments ?? post.commentsCount ?? 0}</span>

        <button onClick={handleSave} className="post-btn save">
          ⊡ save
        </button>
      </div>
    </Card>
  );
}

// ─── PostFeed ───────────────────────────

export function PostFeed({ posts, loading, totalCount, onOpen, onLike, onSave }) {
  const [sort, setSort] = useState("latest");

  if (loading) return <LoadingSpinner label="fetching posts..." />;
  if (!posts?.length)
    return <EmptyState icon="◌" title="no posts yet" subtitle="be the first to write something" />;

  return (
    <div className="post-feed">
      <div className="post-feed-header">
        <SectionLabel> {totalCount ?? posts.length} posts this week</SectionLabel>

        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="post-select"
        >
          <option value="latest">latest</option>
          <option value="top">top</option>
          <option value="hot">hot</option>
        </select>
      </div>

      {posts.map(post => (
        <PostCard
          key={post.id}
          post={post}
          onOpen={onOpen}
          onLike={onLike}
          onSave={onSave}
        />
      ))}
    </div>
  );
}

// ─── MiniPostCard ───────────────────────

export function MiniPostCard({ post, onOpen }) {
  return (
    <div onClick={() => onOpen(post)} className="mini-post">
      <div className="mini-title">{post.title}</div>

      <div className="mini-tags">
        <TagList tags={post.tags} />
      </div>

      <div className="mini-footer">
        <span>▲ {post.upvotes ?? post.likesCount ?? 0}</span>
        <span>◎ {post.comments}</span>
        <span className="time">{post.timeAgo}</span>
      </div>
    </div>
  );
}
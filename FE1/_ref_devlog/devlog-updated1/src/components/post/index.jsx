// ─── POST COMPONENTS ─────────────────────────────────────────────────────────
// PostCard, PostFeed

import { useState } from "react";
import { Avatar, Tag, TagList, CodeBlock, Card, SectionLabel, EmptyState, LoadingSpinner } from "../ui";

// ─── PostCard ────────────────────────────────────────────────────────────────

/**
 * @param {{ post: import("../../types").Post, onOpen: Function, onLike: Function, onSave: Function }} props
 */
export function PostCard({ post, onOpen, onLike, onSave }) {
  const [liked,  setLiked]  = useState(post.liked);
  const [votes,  setVotes]  = useState(post.upvotes);

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
    <Card hover onClick={() => onOpen(post)} className="mb-3">
      {/* Author row */}
      <div className="flex items-center gap-3 mb-3">
        <Avatar initials={post.author.initials} gradient={post.author.gradient} />
        <div>
          <div className="text-sm font-medium text-zinc-100">{post.author.name}</div>
          <div className="font-mono text-[11px] text-zinc-500">
            {post.timeAgo} · {post.readTime}
          </div>
        </div>
      </div>

      {/* Title + excerpt */}
      <div className="text-[15px] font-semibold text-zinc-100 leading-snug mb-2">{post.title}</div>
      <div className="text-sm text-zinc-400 leading-relaxed mb-3">{post.excerpt}</div>

      {/* Code preview */}
      {post.code && <CodeBlock lang={post.code.lang} snippet={post.code.snippet} />}

      {/* Tags */}
      <TagList tags={post.tags} className="mb-3" />

      {/* Footer: upvote, comment, save */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 font-mono text-xs transition-colors ${
            liked ? "text-orange-400" : "text-zinc-500 hover:text-zinc-400"
          }`}
        >
          ▲ {votes}
        </button>
        <span className="flex items-center gap-1.5 font-mono text-xs text-zinc-500">
          ◎ {post.comments}
        </span>
        <button
          onClick={handleSave}
          className="flex items-center gap-1.5 font-mono text-xs text-zinc-500 hover:text-zinc-400 ml-auto"
        >
          ⊡ save
        </button>
      </div>
    </Card>
  );
}

// ─── PostFeed ────────────────────────────────────────────────────────────────

/**
 * @param {{ posts: Post[], loading: boolean, totalCount?: number, onOpen: Function, onLike: Function, onSave: Function }} props
 */
export function PostFeed({ posts, loading, totalCount, onOpen, onLike, onSave }) {
  const [sort, setSort] = useState("latest");

  if (loading) return <LoadingSpinner label="fetching posts..." />;
  if (!posts?.length) return <EmptyState icon="◌" title="no posts yet" subtitle="be the first to write something" />;

  return (
    <div className="p-4 max-w-2xl">
      <div className="flex items-center justify-between mb-4">
        <SectionLabel>// {totalCount ?? posts.length} posts this week</SectionLabel>
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="bg-zinc-800 border border-zinc-700 rounded-md px-2.5 py-1 text-xs text-zinc-300 font-mono cursor-pointer outline-none"
        >
          <option value="latest">latest</option>
          <option value="top">top</option>
          <option value="hot">hot</option>
        </select>
      </div>

      {posts.map(post => (
        <PostCard key={post.id} post={post} onOpen={onOpen} onLike={onLike} onSave={onSave} />
      ))}
    </div>
  );
}

// ─── MiniPostCard (dùng trong Profile) ───────────────────────────────────────

export function MiniPostCard({ post, onOpen }) {
  return (
    <div
      onClick={() => onOpen(post)}
      className="bg-zinc-800 border border-zinc-700 hover:border-zinc-600 rounded-xl p-4 mb-2.5 cursor-pointer transition-colors"
    >
      <div className="text-sm font-medium text-zinc-200 mb-2">{post.title}</div>
      <TagList tags={post.tags} className="mb-2" />
      <div className="flex gap-3">
        <span className="font-mono text-xs text-zinc-500">▲ {post.upvotes}</span>
        <span className="font-mono text-xs text-zinc-500">◎ {post.comments}</span>
        <span className="font-mono text-xs text-zinc-500 ml-auto">{post.timeAgo}</span>
      </div>
    </div>
  );
}

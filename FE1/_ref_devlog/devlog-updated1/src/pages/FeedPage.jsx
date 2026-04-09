// ─── FEED PAGE ───────────────────────────────────────────────────────────────
import { usePosts } from "../hooks";

export default function FeedPage({ onOpenPost }) {
  const { posts, loading, error } = usePosts();

  if (loading) return <div className="p-6 font-mono text-zinc-500 text-sm">// loading posts...</div>;
  if (error)   return <div className="p-6 font-mono text-red-400 text-sm">// error: {error}</div>;
  if (!posts.length) return <div className="p-6 font-mono text-zinc-500 text-sm">// no posts yet</div>;

  return (
    <div className="p-4 max-w-2xl space-y-3">
      {posts.map(post => (
        <PostCard key={post.id} post={post} onOpen={() => onOpenPost(post)} />
      ))}
    </div>
  );
}

function PostCard({ post, onOpen }) {
  return (
    <div
      onClick={onOpen}
      className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 cursor-pointer hover:border-zinc-700 transition-colors"
    >
      {/* Tags */}
      {post.tags?.length > 0 && (
        <div className="flex gap-1.5 mb-2">
          {post.tags.map(t => (
            <span key={t} className="font-mono text-[10px] text-green-400 bg-green-950 px-1.5 py-0.5 rounded">
              #{t}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <h2 className="text-base font-semibold text-zinc-100 mb-2 leading-snug">{post.title}</h2>

      {/* Cover image */}
      {post.coverImage && post.coverImage !== "string" && (
        <img src={post.coverImage} alt="" className="w-full h-32 object-cover rounded-md mb-2" />
      )}

      {/* Meta */}
      <div className="flex items-center gap-3 font-mono text-[11px] text-zinc-500">
        <span>👁 {post.viewsCount ?? 0}</span>
        <span>❤️ {post.likesCount ?? 0}</span>
        <span>💬 {post.commentsCount ?? 0}</span>
        {post.readingTime > 0 && <span>⏱ {post.readingTime} min</span>}
        <span className="ml-auto">{new Date(post.publishedAt).toLocaleDateString("vi-VN")}</span>
      </div>
    </div>
  );
}

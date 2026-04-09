import { FaHeart } from "react-icons/fa";
import { FiClock, FiEye, FiMessageCircle } from "react-icons/fi";
import { usePosts } from "../hooks";

export default function FeedPage({ onOpenPost }) {
  const { posts, loading, error } = usePosts();

  if (loading) return <div className="px-6 py-8 font-mono text-sm text-zinc-500">// loading posts...</div>;
  if (error) return <div className="px-6 py-8 font-mono text-sm text-red-400">// error: {error}</div>;
  if (!posts.length) return <div className="px-6 py-8 font-mono text-sm text-zinc-500">// no posts yet</div>;

  return (
    <div className="mx-auto w-full max-w-[920px] px-4 py-5 md:px-6">
      <div className="mb-4 flex items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-zinc-500">Latest Stories</p>
        <p className="text-xs text-zinc-500">{posts.length} posts</p>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onOpen={() => onOpenPost(post)} />
        ))}
      </div>
    </div>
  );
}

function PostCard({ post, onOpen }) {
  return (
    <article
      onClick={onOpen}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-zinc-800/90 bg-zinc-900/90 shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-all hover:border-zinc-700 hover:shadow-[0_14px_40px_rgba(0,0,0,0.35)]"
    >
      <div className="p-4 md:p-5">
        {post.tags?.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {post.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-emerald-800/60 bg-emerald-950/40 px-2 py-0.5 font-mono text-[11px] text-emerald-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <h2 className="text-2xl font-semibold leading-tight text-zinc-100 transition-colors group-hover:text-white md:text-[2rem]">
          {post.title}
        </h2>
      </div>

      {post.coverImage && post.coverImage !== "string" && (
        <div className="px-4 md:px-5">
          <img
            src={post.coverImage}
            alt={post.title}
            className="h-44 w-full rounded-xl object-cover md:h-60"
            loading="lazy"
          />
        </div>
      )}

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 px-4 py-3 font-mono text-xs text-zinc-500 md:px-5">
        <span className="flex items-center gap-1.5">
          <FiEye />
          {post.viewsCount ?? 0}
        </span>
        <span className="flex items-center gap-1.5">
          <FaHeart className="text-pink-500" />
          {post.likesCount ?? 0}
        </span>
        <span className="flex items-center gap-1.5">
          <FiMessageCircle />
          {post.commentsCount ?? 0}
        </span>
        {post.readingTime > 0 && (
          <span className="flex items-center gap-1.5">
            <FiClock />
            {post.readingTime} min
          </span>
        )}
        <span className="ml-auto text-zinc-400">{new Date(post.publishedAt).toLocaleDateString("vi-VN")}</span>
      </div>
    </article>
  );
}

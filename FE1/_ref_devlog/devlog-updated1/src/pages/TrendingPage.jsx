// ─── TRENDING PAGE ────────────────────────────────────────────────────────────

import { usePosts } from "../hooks";
import { SectionLabel } from "../components/ui";

export function TrendingPage({ onOpenPost }) {
  const { posts, loading } = usePosts("top");
  const sorted = [...(posts || [])].sort(
    (a, b) => (b.likesCount ?? b.upvotes ?? 0) - (a.likesCount ?? a.upvotes ?? 0)
  );

  return (
    <div className="p-4 max-w-2xl">
      <SectionLabel className="mb-4">// trending this week</SectionLabel>

      {loading && <div className="font-mono text-zinc-500 text-sm">// loading...</div>}

      {sorted.map((post, i) => (
        <div key={post.id} className="relative">
          <span className="absolute -left-1 top-4 font-mono text-2xl font-bold text-zinc-700 z-10 leading-none">
            #{i + 1}
          </span>
          <div className="ml-8">
            <div
              onClick={() => onOpenPost(post)}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 cursor-pointer hover:border-zinc-700 transition-colors mb-3"
            >
              {post.tags?.length > 0 && (
                <div className="flex gap-1.5 mb-2">
                  {post.tags.map((t) => (
                    <span key={t} className="font-mono text-[10px] text-green-400 bg-green-950 px-1.5 py-0.5 rounded">
                      #{t}
                    </span>
                  ))}
                </div>
              )}
              <h2 className="text-base font-semibold text-zinc-100 mb-2 leading-snug">{post.title}</h2>
              <div className="flex items-center gap-3 font-mono text-[11px] text-zinc-500">
                <span>likes {post.likesCount ?? post.upvotes ?? 0}</span>
                <span>comments {post.commentsCount ?? post.comments ?? 0}</span>
                <span className="ml-auto">{new Date(post.publishedAt).toLocaleDateString("vi-VN")}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

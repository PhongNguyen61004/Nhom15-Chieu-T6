// ─── DETAIL PAGE ─────────────────────────────────────────────────────────────
import { useState } from "react";
import { useComments, useCurrentUser } from "../hooks";

export default function DetailPage({ post, onBack }) {
  const { user } = useCurrentUser();
  const { comments, loading: cLoading, addComment, deleteComment, likeComment } = useComments(post.id);

  return (
    <div className="p-5 max-w-2xl">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 font-mono text-xs text-zinc-500 hover:text-zinc-400 mb-4 transition-colors"
      >
        ← back to feed
      </button>

      {post.tags?.length > 0 && (
        <div className="flex gap-1.5 mb-3">
          {post.tags.map(t => (
            <span key={t} className="font-mono text-[10px] text-green-400 bg-green-950 px-1.5 py-0.5 rounded">
              #{t}
            </span>
          ))}
        </div>
      )}

      <h1 className="text-2xl font-bold text-zinc-100 leading-tight mb-4">{post.title}</h1>

      {post.coverImage && post.coverImage !== "string" && (
        <img src={post.coverImage} alt="" className="w-full rounded-lg mb-4" />
      )}

      <div className="flex items-center gap-4 mb-6 pb-4 border-b border-zinc-800 font-mono text-xs text-zinc-500">
        <span>👁 {post.viewsCount}</span>
        <span>❤️ {post.likesCount}</span>
        {post.readingTime > 0 && <span>⏱ {post.readingTime} min</span>}
        <span className="ml-auto">{new Date(post.publishedAt).toLocaleDateString("vi-VN")}</span>
      </div>

      <div className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap mb-8">
        {post.content}
      </div>

      <CommentSection
        comments={comments}
        loading={cLoading}
        currentUser={user}
        onSubmit={addComment}
        onLike={likeComment}
        onDelete={deleteComment}
      />
    </div>
  );
}

function CommentSection({ comments, loading, currentUser, onSubmit, onLike, onDelete }) {
  const [text, setText] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    await onSubmit(text);
    setText("");
  }

  return (
    <div>
      <p className="font-mono text-xs text-zinc-500 mb-4">// comments ({comments.length})</p>

      {currentUser && (
        <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Viết comment..."
            className="flex-1 bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-sm text-zinc-200 font-mono focus:outline-none focus:border-green-500"
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-400 text-zinc-950 font-mono text-xs font-semibold px-4 rounded-md transition-colors"
          >
            gửi
          </button>
        </form>
      )}

      {loading && <p className="font-mono text-xs text-zinc-500">// loading...</p>}

      <div className="space-y-3">
        {comments.map(c => (
          <div key={c.id} className="bg-zinc-900 border border-zinc-800 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs text-green-400">{c.authorId}</span>
              <span className="font-mono text-[10px] text-zinc-600">
                {new Date(c.createdAt).toLocaleDateString("vi-VN")}
              </span>
              {c.isEdited && <span className="font-mono text-[10px] text-zinc-600">(edited)</span>}
            </div>
            <p className="text-sm text-zinc-300">{c.content}</p>
            <div className="flex items-center gap-3 mt-2">
              <button
                onClick={() => onLike(c.id)}
                className="font-mono text-[10px] text-zinc-500 hover:text-green-400 transition-colors"
              >
                ❤️ {c.likesCount || 0}
              </button>
              {currentUser?.id === c.authorId && (
                <button
                  onClick={() => onDelete(c.id)}
                  className="font-mono text-[10px] text-zinc-500 hover:text-red-400 transition-colors"
                >
                  xoá
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

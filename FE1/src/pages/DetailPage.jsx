import { useState } from "react";
import { useComments, useCurrentUser } from "../hooks";
import "./DetailPage.css";

export default function DetailPage({ post, onBack }) {
  const { user } = useCurrentUser();
  const {
    comments,
    loading: cLoading,
    addComment,
    deleteComment,
    likeComment,
  } = useComments(post?.id);

  const safeDate = post?.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("vi-VN")
    : "-";

  return (
    <div className="detail-container">
      <button onClick={onBack} className="detail-back">
        ← back to feed
      </button>

      {/* TAGS */}
      {post?.tags?.length > 0 && (
        <div className="detail-tags">
          {post.tags.map((t, i) => (
            <span key={i} className="detail-tag">
              #{t}
            </span>
          ))}
        </div>
      )}

      {/* TITLE */}
      <h1 className="detail-title">{post?.title || "Untitled"}</h1>

      {/* COVER */}
      {typeof post?.coverImage === "string" && post.coverImage && (
        <img
          src={post.coverImage}
          alt=""
          className="detail-cover"
        />
      )}

      {/* META */}
      <div className="detail-meta">
        <span>👁 {post?.viewsCount ?? 0}</span>
        <span>❤️ {post?.likesCount ?? 0}</span>
        {post?.readingTime > 0 && (
          <span>⏱ {post.readingTime} min</span>
        )}
        <span className="detail-date">{safeDate}</span>
      </div>

      {/* CONTENT */}
      <div className="detail-content">
        {post?.content || ""}
      </div>

      {/* COMMENTS */}
      <CommentSection
        comments={comments || []}
        loading={cLoading}
        currentUser={user}
        onSubmit={addComment}
        onLike={likeComment}
        onDelete={deleteComment}
      />
    </div>
  );
}



function CommentSection({
  comments = [],
  loading,
  currentUser,
  onSubmit,
  onLike,
  onDelete,
}) {
  const [text, setText] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      await onSubmit(text);
      setText("");
    } catch (err) {
      console.error("Comment error:", err);
    }
  }

  return (
    <div className="comment-section">
      <p className="comment-title">
         comments ({comments.length})
      </p>

      {/* INPUT */}
      {currentUser && (
        <form onSubmit={handleSubmit} className="comment-form">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Viết comment..."
            className="comment-input"
          />
          <button type="submit" className="comment-submit">
            gửi
          </button>
        </form>
      )}

      {/* LOADING */}
      {loading && (
        <p className="comment-loading"> loading...</p>
      )}

      {/* EMPTY */}
      {!loading && comments.length === 0 && (
        <p className="comment-empty">chưa có comment</p>
      )}

      {/* LIST */}
      <div className="comment-list">
        {comments.map((c) => {
          const author =
            c.authorName ||
            c.authorId?.slice(0, 6) ||
            "user";

          const date = c.createdAt
            ? new Date(c.createdAt).toLocaleDateString("vi-VN")
            : "-";

          return (
            <div key={c.id} className="comment-item">
              <div className="comment-meta">
                <span className="comment-author">
                  {author}
                </span>
                <span className="comment-time">
                  {date}
                </span>
                {c.isEdited && (
                  <span className="comment-edited">
                    (edited)
                  </span>
                )}
              </div>

              <p className="comment-content">
                {c.content}
              </p>

              <div className="comment-actions">
                <button
                  onClick={() => onLike(c.id)}
                  className="comment-like"
                >
                  ❤️ {c.likesCount ?? 0}
                </button>

                {currentUser?.id === c.authorId && (
                  <button
                    onClick={() => onDelete(c.id)}
                    className="comment-delete"
                  >
                    xoá
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
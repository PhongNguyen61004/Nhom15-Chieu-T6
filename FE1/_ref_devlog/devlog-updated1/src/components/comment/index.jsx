// ─── COMMENT COMPONENTS ──────────────────────────────────────────────────────
// CommentBox, CommentItem, CommentList

import { useState } from "react";
import { Avatar, SectionLabel } from "../ui";

// ─── CommentBox (input để đăng comment mới) ───────────────────────────────────

export function CommentBox({ currentUser, onSubmit }) {
  const [text, setText] = useState("");

  function handleSubmit() {
    if (!text.trim()) return;
    onSubmit(text);
    setText("");
  }

  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-3 mb-4 flex gap-3">
      <Avatar initials={currentUser.initials} gradient={currentUser.gradient} />
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => e.key === "Enter" && e.metaKey && handleSubmit()}
        placeholder="add your thoughts... (⌘+Enter to post)"
        className="flex-1 bg-transparent border-none outline-none text-sm text-zinc-200 placeholder-zinc-600 resize-none min-h-[56px] font-sans leading-relaxed"
      />
      <button
        onClick={handleSubmit}
        disabled={!text.trim()}
        className="self-end bg-green-400 text-zinc-900 rounded-md px-3 py-1.5 text-xs font-mono font-bold hover:bg-green-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        post
      </button>
    </div>
  );
}

// ─── CommentItem ──────────────────────────────────────────────────────────────

export function CommentItem({ comment, onLike }) {
  const [liked,  setLiked]  = useState(false);
  const [votes,  setVotes]  = useState(comment.upvotes);

  function handleLike() {
    const next = !liked;
    setLiked(next);
    setVotes(next ? votes + 1 : votes - 1);
    onLike?.(comment.id);
  }

  return (
    <div className="flex gap-3 py-3 border-b border-zinc-800 last:border-none">
      <Avatar initials={comment.initials} gradient={comment.gradient} />
      <div className="flex-1">
        <div className="text-sm font-medium text-zinc-200 mb-1">
          {comment.author}
          <span className="font-mono text-[10px] text-zinc-500 font-normal ml-2">· {comment.time}</span>
        </div>
        <div className="text-sm text-zinc-400 leading-relaxed">{comment.text}</div>
        <div className="flex gap-3 mt-2">
          <button
            onClick={handleLike}
            className={`font-mono text-[11px] transition-colors ${liked ? "text-orange-400" : "text-zinc-500 hover:text-zinc-400"}`}
          >
            ▲ {votes}
          </button>
          <button className="font-mono text-[11px] text-zinc-500 hover:text-zinc-400">reply</button>
        </div>
      </div>
    </div>
  );
}

// ─── CommentList ──────────────────────────────────────────────────────────────

export function CommentList({ comments, currentUser, onSubmit, onLike }) {
  return (
    <div className="border-t border-zinc-800 pt-5 mt-6">
      <SectionLabel className="mb-4">// {comments.length} comments</SectionLabel>

      <CommentBox currentUser={currentUser} onSubmit={onSubmit} />

      {comments.map(c => (
        <CommentItem key={c.id} comment={c} onLike={onLike} />
      ))}
    </div>
  );
}

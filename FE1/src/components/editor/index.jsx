import "./index.css";
import { SectionLabel } from "../ui";

// ─── Toolbar ─────────────────────────────

const TOOLBAR_ACTIONS = [
  { label: "B", title: "bold" },
  { label: "I", title: "italic" },
  { label: "</>", title: "inline code" },
  { label: "```", title: "code block" },
  { label: "##", title: "heading" },
  { label: "[ ]", title: "checkbox" },
  { label: "→", title: "blockquote" },
  { label: "img", title: "insert image" },
  { label: "link", title: "insert link" },
];

export function EditorToolbar({ onAction }) {
  return (
    <div className="editor-toolbar">
      {TOOLBAR_ACTIONS.map(a => (
        <button
          key={a.label}
          title={a.title}
          onClick={() => onAction?.(a.label)}
          className="toolbar-btn"
        >
          {a.label}
        </button>
      ))}
    </div>
  );
}

// ─── PostEditor ───────────────────────────

export function PostEditor({
  title, setTitle,
  body, setBody,
  tags, setTags,
  publishing, error,
  onPublish, onSaveDraft
}) {
  const charCount = body.length;
  const readEstimate = Math.max(1, Math.ceil(body.split(/\s+/).length / 200));

  return (
    <div className="editor-container">
      <SectionLabel> new post</SectionLabel>

      {/* Title */}
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="what did you build, learn, or break?"
        className="editor-title"
      />

      {/* Body */}
      <div className="editor-box">
        <EditorToolbar />

        <textarea
          value={body}
          onChange={e => setBody(e.target.value)}
          placeholder="write in markdown... code blocks, links, all supported"
          className="editor-textarea"
        />

        <div className="editor-meta">
          <span>{charCount} chars</span>
          <span>~{readEstimate} min read</span>
        </div>
      </div>

      {/* Tags */}
      <div className="editor-tags">
        <span className="tags-label">tags:</span>
        <input
          value={tags}
          onChange={e => setTags(e.target.value)}
          placeholder="rust, performance, systems..."
          className="tags-input"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="editor-error">
          ✗ {error}
        </div>
      )}

      {/* Actions */}
      <div className="editor-actions">
        <button onClick={onSaveDraft} className="btn-secondary">
          save draft
        </button>

        <button
          onClick={onPublish}
          disabled={publishing || !title.trim() || !body.trim()}
          className="btn-primary"
        >
          {publishing ? "publishing..." : "publish post"}
        </button>
      </div>
    </div>
  );
}
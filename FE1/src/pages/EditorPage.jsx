import { usePostEditor } from "../hooks";
import "./EditorPage.css";

export default function EditorPage({ onSuccess }) {
  const {
    title, setTitle,
    body, setBody,
    tags, setTags,
    coverImage, setCoverImage,
    publishing, error,
    publish,
  } = usePostEditor(onSuccess);

  async function handleSubmit(e) {
    e.preventDefault();
    if (publishing) return;

    await publish();
  }

  return (
    <div className="editor-container">
      <p className="editor-title"> new post</p>

      {error && (
        <div className="editor-error">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="editor-form">
        <Field label="title" value={title} onChange={setTitle} />

        <Field
          label="cover image url"
          value={coverImage}
          onChange={setCoverImage}
        />

        <Field
          label="tags (phân cách bằng dấu phẩy)"
          value={tags}
          onChange={setTags}
        />

        <div>
          <label className="editor-label">content</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={12}
            className="editor-textarea"
            placeholder="Viết nội dung bài viết..."
          />
        </div>

        <button
          type="submit"
          disabled={publishing}
          className="editor-submit"
        >
          {publishing ? "publishing..." : "publish"}
        </button>
      </form>
    </div>
  );
}

// ─── FIELD ─────────────────────────

function Field({ label, value, onChange }) {
  return (
    <div>
      <label className="editor-label">{label}</label>
      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="editor-input"
      />
    </div>
  );
}
// ─── EDITOR PAGE ──────────────────────────────────────────────────────────────
import { usePostEditor } from "../hooks";

export default function EditorPage({ onSuccess }) {
  const {
    title, setTitle,
    body, setBody,
    tags, setTags,
    coverImage, setCoverImage,
    publishing, error,
    publish,
  } = usePostEditor(onSuccess);

  return (
    <div className="p-4 max-w-2xl">
      <p className="font-mono text-xs text-zinc-500 mb-4">// new post</p>

      {error && (
        <div className="mb-4 p-3 bg-red-950 border border-red-800 rounded-md text-red-400 text-xs font-mono">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <Field label="title" value={title} onChange={setTitle} />
        <Field label="cover image url" value={coverImage} onChange={setCoverImage} />
        <Field label="tags (dấu phẩy phân cách)" value={tags} onChange={setTags} />
        <div>
          <label className="block font-mono text-xs text-zinc-500 mb-1">content</label>
          <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
            rows={12}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-sm text-zinc-200 font-mono focus:outline-none focus:border-green-500 resize-none"
          />
        </div>
        <button
          onClick={publish}
          disabled={publishing}
          className="bg-green-500 hover:bg-green-400 disabled:opacity-50 text-zinc-950 font-mono font-semibold text-sm px-6 py-2 rounded-md transition-colors"
        >
          {publishing ? "publishing..." : "publish"}
        </button>
      </div>
    </div>
  );
}

function Field({ label, value, onChange }) {
  return (
    <div>
      <label className="block font-mono text-xs text-zinc-500 mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-sm text-zinc-200 font-mono focus:outline-none focus:border-green-500"
      />
    </div>
  );
}

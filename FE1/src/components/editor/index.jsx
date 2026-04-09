// ─── EDITOR COMPONENTS ───────────────────────────────────────────────────────
// PostEditor — markdown editor để tạo bài viết mới

import { SectionLabel } from "../ui";

// ─── EditorToolbar ────────────────────────────────────────────────────────────

const TOOLBAR_ACTIONS = [
  { label: "B",    title: "bold"          },
  { label: "I",    title: "italic"        },
  { label: "</>",  title: "inline code"   },
  { label: "```",  title: "code block"    },
  { label: "##",   title: "heading"       },
  { label: "[ ]",  title: "checkbox"      },
  { label: "→",    title: "blockquote"    },
  { label: "img",  title: "insert image"  },
  { label: "link", title: "insert link"   },
];

export function EditorToolbar({ onAction }) {
  return (
    <div className="flex gap-0.5 p-2 border-b border-zinc-800">
      {TOOLBAR_ACTIONS.map(a => (
        <button
          key={a.label}
          title={a.title}
          onClick={() => onAction?.(a.label)}
          className="px-2 py-1.5 rounded text-xs font-mono text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300 transition-colors"
        >
          {a.label}
        </button>
      ))}
    </div>
  );
}

// ─── PostEditor ───────────────────────────────────────────────────────────────

/**
 * @param {{
 *   title: string, setTitle: Function,
 *   body: string, setBody: Function,
 *   tags: string, setTags: Function,
 *   publishing: boolean, error: string|null,
 *   onPublish: Function, onSaveDraft: Function
 * }} props
 */
export function PostEditor({ title, setTitle, body, setBody, tags, setTags, publishing, error, onPublish, onSaveDraft }) {
  const charCount = body.length;
  const readEstimate = Math.max(1, Math.ceil(body.split(/\s+/).length / 200));

  return (
    <div className="p-4 flex flex-col gap-3 max-w-2xl">
      <SectionLabel>// new post</SectionLabel>

      {/* Title */}
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="what did you build, learn, or break?"
        className="bg-transparent border-b border-zinc-700 pb-3 text-xl font-bold text-zinc-100 placeholder-zinc-600 outline-none focus:border-zinc-500 transition-colors"
      />

      {/* Body editor */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <EditorToolbar />
        <textarea
          value={body}
          onChange={e => setBody(e.target.value)}
          placeholder="write in markdown... code blocks, links, all supported"
          className="w-full bg-transparent p-4 text-sm text-zinc-200 placeholder-zinc-600 outline-none resize-none min-h-[260px] leading-relaxed font-sans"
        />
        <div className="px-4 pb-2 flex justify-end gap-4">
          <span className="font-mono text-[11px] text-zinc-600">{charCount} chars</span>
          <span className="font-mono text-[11px] text-zinc-600">~{readEstimate} min read</span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2.5">
        <span className="font-mono text-xs text-zinc-500">tags:</span>
        <input
          value={tags}
          onChange={e => setTags(e.target.value)}
          placeholder="rust, performance, systems (comma separated, up to 5)"
          className="flex-1 bg-transparent font-mono text-xs text-zinc-300 placeholder-zinc-600 outline-none"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-950 border border-red-800 rounded-lg px-3 py-2 text-xs text-red-300 font-mono">
          ✗ {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 justify-end">
        <button
          onClick={onSaveDraft}
          className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-xs font-mono text-zinc-400 hover:border-zinc-600 transition-colors"
        >
          save draft
        </button>
        <button
          onClick={onPublish}
          disabled={publishing || !title.trim() || !body.trim()}
          className="bg-green-400 rounded-lg px-5 py-2 text-xs font-mono font-bold text-zinc-900 hover:bg-green-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {publishing ? "publishing..." : "publish post"}
        </button>
      </div>
    </div>
  );
}

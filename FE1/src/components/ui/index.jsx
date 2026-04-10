// ─── UI PRIMITIVES ────────────────────────────────────────────────────────────
// Atomic components không chứa business logic, dùng khắp app

// ─── Avatar ───────────────────────────────────────────────────────────────────

const SIZES = {
  xs: "w-6  h-6  text-[10px]",
  sm: "w-8  h-8  text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-16 h-16 text-2xl",
};

/**
 * @param {{ initials: string, gradient: string, size?: "xs"|"sm"|"md"|"lg", onClick?: Function }} props
 */
export function Avatar({ initials, gradient, size = "sm", onClick }) {
  return (
    <div
      onClick={onClick}
      className={`
        ${SIZES[size]} rounded-full flex-shrink-0
        bg-gradient-to-br ${gradient}
        flex items-center justify-center
        font-bold text-zinc-900
        ${onClick ? "cursor-pointer" : ""}
      `}
    >
      {initials}
    </div>
  );
}

// ─── Tag ──────────────────────────────────────────────────────────────────────

/**
 * @param {{ label: string, color: string, onClick?: Function }} props
 */
export function Tag({ label, color, onClick }) {
  return (
    <span
      onClick={onClick}
      className={`px-2 py-0.5 rounded text-xs font-mono border ${color} ${onClick ? "cursor-pointer hover:opacity-80" : ""}`}
    >
      {label}
    </span>
  );
}

// ─── TagList ──────────────────────────────────────────────────────────────────

export function TagList({ tags, className = "" }) {
  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {tags.map(t => <Tag key={t.label} {...t} />)}
    </div>
  );
}

// ─── CodeBlock ────────────────────────────────────────────────────────────────

export function CodeBlock({ lang, snippet }) {
  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3 font-mono text-xs text-zinc-400 leading-relaxed mb-3 overflow-x-auto">
      <div className="text-zinc-600 text-[10px] mb-2">// {lang}</div>
      <pre className="whitespace-pre-wrap">{snippet}</pre>
    </div>
  );
}

// ─── SectionLabel ─────────────────────────────────────────────────────────────

export function SectionLabel({ children, className = "" }) {
  return (
    <div className={`font-mono text-[10px] text-zinc-500 uppercase tracking-widest ${className}`}>
      {children}
    </div>
  );
}

// ─── Button ───────────────────────────────────────────────────────────────────

const VARIANTS = {
  primary:  "bg-green-400 text-zinc-900 hover:bg-green-300 border-transparent",
  ghost:    "bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200",
  outline:  "bg-transparent border-zinc-700 text-zinc-400 hover:border-green-500 hover:text-green-400",
  danger:   "bg-red-950 border-red-800 text-red-300 hover:border-red-600",
};

export function Button({ children, variant = "ghost", className = "", disabled, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded-lg px-3 py-1.5 text-xs font-mono font-semibold
        border transition-colors
        disabled:opacity-50 disabled:cursor-not-allowed
        ${VARIANTS[variant]} ${className}
      `}
    >
      {children}
    </button>
  );
}

// ─── StatRow ──────────────────────────────────────────────────────────────────

export function StatRow({ stats }) {
  return (
    <div className="grid border-t border-zinc-800 pt-4" style={{ gridTemplateColumns: `repeat(${stats.length}, 1fr)` }}>
      {stats.map(({ label, value }) => (
        <div key={label} className="text-center border-r border-zinc-800 last:border-none">
          <div className="font-mono text-lg font-bold text-zinc-100">{value}</div>
          <div className="text-[11px] text-zinc-500 mt-0.5">{label}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

export function Card({ children, className = "", onClick, hover = false }) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-zinc-900 border border-zinc-800 rounded-xl p-4
        ${hover ? "hover:border-zinc-700 cursor-pointer transition-colors" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

// ─── EmptyState ───────────────────────────────────────────────────────────────

export function EmptyState({ icon = "◌", title, subtitle }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="font-mono text-4xl text-zinc-700 mb-3">{icon}</div>
      <div className="text-sm font-medium text-zinc-400 mb-1">{title}</div>
      {subtitle && <div className="text-xs text-zinc-600">{subtitle}</div>}
    </div>
  );
}

// ─── LoadingSpinner ───────────────────────────────────────────────────────────

export function LoadingSpinner({ label = "loading..." }) {
  return (
    <div className="flex items-center gap-2 py-8 justify-center">
      <div className="w-4 h-4 border border-zinc-600 border-t-green-400 rounded-full animate-spin" />
      <span className="font-mono text-xs text-zinc-500">{label}</span>
    </div>
  );
}

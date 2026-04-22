import "./index.css";

// ─── Avatar ─────────────────────────────

function getAvatarUrl(userId) {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`;
}

export function Avatar({ user, size = "sm", onClick }) {
  const avatarUrl = user?.avatar || getAvatarUrl(user?.id);

  return (
    <img
      src={avatarUrl}
      onClick={onClick}
      className={`avatar avatar-${size} ${onClick ? "clickable" : ""}`}
      alt="avatar"
    />
  );
}

// ─── Tag ─────────────────────────────

export function Tag({ label, color, onClick }) {
  return (
    <span
      onClick={onClick}
      className={`tag ${color} ${onClick ? "clickable" : ""}`}
    >
      {label}
    </span>
  );
}

// ─── TagList ─────────────────────────

export function TagList({ tags, className = "" }) {
  return (
    <div className={`tag-list ${className}`}>
      {tags.map(t => <Tag key={t.label} {...t} />)}
    </div>
  );
}

// ─── CodeBlock ───────────────────────

export function CodeBlock({ lang, snippet }) {
  return (
    <div className="code-block">
      <div className="code-lang">// {lang}</div>
      <pre>{snippet}</pre>
    </div>
  );
}

// ─── SectionLabel ────────────────────

export function SectionLabel({ children, className = "" }) {
  return (
    <div className={`section-label ${className}`}>
      {children}
    </div>
  );
}

// ─── Button ──────────────────────────

export function Button({
  children,
  variant = "ghost",
  className = "",
  disabled,
  onClick,
  type = "button"
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant} ${className}`}
    >
      {children}
    </button>
  );
}

// ─── StatRow ─────────────────────────

export function StatRow({ stats }) {
  return (
    <div
      className="stat-row"
      style={{ gridTemplateColumns: `repeat(${stats.length}, 1fr)` }}
    >
      {stats.map(({ label, value }) => (
        <div key={label} className="stat-item">
          <div className="stat-value">{value}</div>
          <div className="stat-label">{label}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Card ────────────────────────────

export function Card({ children, className = "", onClick, hover = false }) {
  return (
    <div
      onClick={onClick}
      className={`card ${hover ? "hover" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

// ─── EmptyState ──────────────────────

export function EmptyState({ icon = "◌", title, subtitle }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">{icon}</div>
      <div className="empty-title">{title}</div>
      {subtitle && <div className="empty-sub">{subtitle}</div>}
    </div>
  );
}

// ─── LoadingSpinner ──────────────────

export function LoadingSpinner({ label = "loading..." }) {
  return (
    <div className="loading">
      <div className="spinner" />
      <span className="loading-text">{label}</span>
    </div>
  );
}
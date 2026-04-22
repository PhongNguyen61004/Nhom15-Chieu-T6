import "./index.css";
import { Avatar } from "../ui";

// ─── NotifItem ───────────────────────────


export function NotifItem({ notif, onRead }) {
  const initials = notif?.initials || notif?.actor?.charAt(0)?.toUpperCase() || "U";
  function handleClick() {
    if (!notif.read) onRead?.(notif.id);
  }

  return (
    <div
      onClick={handleClick}
      className={`notif-item ${!notif.read ? "unread" : ""}`}
    >
      {/* Dot */}
      <div className={`notif-dot ${!notif.read ? "active" : ""}`} />

      <Avatar initials={initials} gradient={notif.gradient} />

      <div className="notif-content">
        <div className="notif-text">
          <strong className="notif-actor">{notif.actor}</strong> {notif.text}
        </div>
        <div className="notif-time">{notif.time}</div>
      </div>
    </div>
  );
}

// ─── NotifList ───────────────────────────

export function NotifList({ notifs, onRead, onMarkAllRead }) {
  return (
    <div className="notif-list">
      <div className="notif-header">
        <span className="notif-title">// notifications</span>
        <button onClick={onMarkAllRead} className="notif-mark">
          mark all read
        </button>
      </div>

      {notifs.length === 0 ? (
        <div className="notif-empty">all caught up ✓</div>
      ) : (
        notifs.map(n => (
          <NotifItem key={n.id} notif={n} onRead={onRead} />
        ))
      )}
    </div>
  );
}
// ─── NOTIFICATION COMPONENTS ─────────────────────────────────────────────────

import { Avatar } from "../ui";

// ─── NotifItem ────────────────────────────────────────────────────────────────

export function NotifItem({ notif, onRead }) {
  function handleClick() {
    if (!notif.read) onRead?.(notif.id);
  }

  return (
    <div
      onClick={handleClick}
      className={`flex items-start gap-3 px-4 py-3 border-b border-zinc-800 cursor-pointer hover:bg-zinc-800/50 transition-colors ${
        !notif.read ? "bg-zinc-800/30" : ""
      }`}
    >
      {/* Unread dot */}
      <div
        className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
          !notif.read ? "bg-green-400" : "border border-zinc-700"
        }`}
      />

      <Avatar initials={notif.initials} gradient={notif.gradient} />

      <div className="flex-1 min-w-0">
        <div className="text-sm text-zinc-300 leading-relaxed">
          <strong className="text-green-400 font-medium">{notif.actor}</strong>{" "}
          {notif.text}
        </div>
        <div className="font-mono text-[11px] text-zinc-500 mt-1">{notif.time}</div>
      </div>
    </div>
  );
}

// ─── NotifList ────────────────────────────────────────────────────────────────

export function NotifList({ notifs, onRead, onMarkAllRead }) {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
        <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
          // notifications
        </span>
        <button
          onClick={onMarkAllRead}
          className="font-mono text-xs text-zinc-500 hover:text-zinc-400 transition-colors"
        >
          mark all read
        </button>
      </div>

      {notifs.length === 0 ? (
        <div className="py-16 text-center font-mono text-sm text-zinc-600">all caught up ✓</div>
      ) : (
        notifs.map(n => <NotifItem key={n.id} notif={n} onRead={onRead} />)
      )}
    </div>
  );
}

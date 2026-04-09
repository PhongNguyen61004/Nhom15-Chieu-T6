// ─── LAYOUT COMPONENTS ───────────────────────────────────────────────────────
// TopBar, Sidebar, RightPanel, Tabs, AppShell

import { Avatar } from "../ui";
import { NAV_ITEMS, TOPIC_TAGS, TRENDING_TAGS, WHO_TO_FOLLOW } from "../../constants/mockData";

// ─── TopBar ───────────────────────────────────────────────────────────────────

export function TopBar({ user, onNavigate }) {
  return (
    <header className="flex items-center gap-3 px-4 py-3 bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
      <div className="font-mono text-[15px] font-bold text-green-400 tracking-tight whitespace-nowrap">
        &gt;devlog<span className="text-zinc-600">_</span>
      </div>

      <div className="flex-1 max-w-sm relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-base pointer-events-none">⌕</span>
        <input
          type="text"
          placeholder="search posts, tags, people..."
          className="w-full bg-zinc-800 border border-zinc-700 rounded-md pl-8 pr-3 py-1.5 text-sm text-zinc-200 placeholder-zinc-600 outline-none focus:border-zinc-600"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button
          onClick={() => onNavigate("editor")}
          className="bg-green-400 text-zinc-900 font-mono text-xs font-bold rounded-md px-3 py-1.5 hover:bg-green-300 transition-colors whitespace-nowrap"
        >
          + new post
        </button>
        <Avatar
          initials={user.initials}
          gradient={user.gradient}
          onClick={() => onNavigate("profile")}
        />
      </div>
    </header>
  );
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────

export function Tabs({ active, onChange, unreadCount }) {
  const items = [
    { id: "feed",          label: "feed"          },
    { id: "trending",      label: "trending"      },
    { id: "notifications", label: "notifications", badge: unreadCount },
  ];

  return (
    <nav className="flex border-b border-zinc-800 bg-zinc-900 px-4">
      {items.map(t => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-sm border-b-2 -mb-px transition-colors ${
            active === t.id
              ? "text-green-400 border-green-400"
              : "text-zinc-500 border-transparent hover:text-zinc-400"
          }`}
        >
          {t.label}
          {t.badge > 0 && (
            <span className="bg-orange-500 text-zinc-900 font-mono text-[10px] font-bold rounded-full px-1.5 py-0.5">
              {t.badge}
            </span>
          )}
        </button>
      ))}
    </nav>
  );
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────

export function Sidebar({ active, onNavigate }) {
  return (
    <aside className="w-48 flex-shrink-0 border-r border-zinc-800 p-3 flex-col gap-1 hidden md:flex">
      <div className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest px-2 pt-1 pb-2">
        navigate
      </div>

      {NAV_ITEMS.map(n => (
        <button
          key={n.id}
          onClick={() => onNavigate(n.id)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors w-full text-left ${
            active === n.id
              ? "bg-green-950 text-green-400"
              : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
          }`}
        >
          <span className="w-4 text-center">{n.icon}</span>
          <span>{n.label}</span>
        </button>
      ))}

      <div className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest px-2 pt-4 pb-2">
        topics
      </div>

      {TOPIC_TAGS.map(t => (
        <button
          key={t.id}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors w-full text-left"
        >
          <span className={`w-4 text-center text-xs ${t.color}`}>■</span>
          <span>{t.id}</span>
        </button>
      ))}
    </aside>
  );
}

// ─── RightPanel ───────────────────────────────────────────────────────────────

export function RightPanel() {
  return (
    <aside className="w-52 flex-shrink-0 border-l border-zinc-800 p-4 flex-col gap-5 hidden lg:flex">
      {/* Trending Tags */}
      <div>
        <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-3">
          trending tags
        </div>
        {TRENDING_TAGS.map((t, i) => (
          <div key={t.name} className="flex gap-2.5 py-1.5 border-b border-zinc-800 last:border-none cursor-pointer hover:opacity-80 transition-opacity">
            <span className="font-mono text-xs text-zinc-600 w-4 flex-shrink-0">#{i + 1}</span>
            <div>
              <div className="font-mono text-xs text-cyan-300">{t.name}</div>
              <div className="text-[11px] text-zinc-500">{t.count}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Who to follow */}
      <div>
        <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-3">
          who to follow
        </div>
        {WHO_TO_FOLLOW.map(u => (
          <div key={u.name} className="flex items-center gap-2 py-1.5">
            <Avatar initials={u.initials} gradient={u.gradient} />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-zinc-200 truncate">{u.name}</div>
              <div className="text-[11px] text-zinc-500">{u.role}</div>
            </div>
            <button className="bg-zinc-800 border border-zinc-700 rounded px-2 py-1 text-[11px] font-mono text-zinc-400 hover:border-green-500 hover:text-green-400 transition-colors flex-shrink-0">
              follow
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
}

// ─── AppShell ────────────────────────────────────────────────────────────────
// Wrapper bọc toàn bộ layout — children là main content

export function AppShell({ user, activePage, onNavigate, unreadCount, showTabs, showRightPanel, children }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <TopBar user={user} onNavigate={onNavigate} />

      {showTabs && (
        <Tabs
          active={activePage}
          onChange={onNavigate}
          unreadCount={unreadCount}
        />
      )}

      <div className="flex">
        <Sidebar active={activePage} onNavigate={onNavigate} />

        <main className="flex-1 min-w-0 overflow-y-auto">
          {children}
        </main>

        {showRightPanel && <RightPanel />}
      </div>
    </div>
  );
}

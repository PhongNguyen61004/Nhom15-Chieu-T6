import { FiCompass, FiSearch } from "react-icons/fi";
import { Avatar } from "../ui";
import { NAV_ITEMS, TOPIC_TAGS, TRENDING_TAGS, WHO_TO_FOLLOW } from "../../constants/mockData";

export function TopBar({ user, onNavigate }) {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-4 px-4 py-3 md:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <button
            onClick={() => onNavigate("feed")}
            className="whitespace-nowrap font-mono text-[30px] font-semibold leading-none tracking-tight text-emerald-400"
          >
            devlog
          </button>

          <div className="relative hidden w-full max-w-[520px] sm:block">
            <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500" />
            <input
              type="text"
              placeholder="Search posts, tags, people..."
              className="w-full rounded-xl border border-zinc-700/80 bg-zinc-900 px-10 py-2.5 text-sm text-zinc-200 outline-none transition-colors placeholder:text-zinc-500 focus:border-emerald-500/70"
            />
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={() => onNavigate("editor")}
            className="rounded-xl bg-emerald-400 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wide text-zinc-950 transition-colors hover:bg-emerald-300"
          >
            + New Post
          </button>
          <Avatar initials={user.initials} gradient={user.gradient} onClick={() => onNavigate("profile")} />
        </div>
      </div>
    </header>
  );
}

export function Tabs({ active, onChange, unreadCount }) {
  const items = [
    { id: "feed", label: "feed" },
    { id: "trending", label: "trending" },
    { id: "notifications", label: "notifications", badge: unreadCount },
  ];

  return (
    <nav className="border-b border-zinc-800/80 bg-zinc-950/70">
      <div className="mx-auto flex w-full max-w-[1440px] items-center px-4 md:px-6">
        {items.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`-mb-px flex items-center gap-1.5 border-b-2 px-4 py-3 text-sm capitalize transition-colors ${
              active === tab.id ? "border-emerald-400 text-emerald-400" : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {tab.label}
            {tab.badge > 0 && (
              <span className="rounded-full bg-orange-500 px-1.5 py-0.5 font-mono text-[10px] font-bold text-zinc-900">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}

export function Sidebar({ active, onNavigate }) {
  return (
    <aside className="sticky top-[118px] hidden h-[calc(100vh-118px)] overflow-y-auto border-r border-zinc-800/80 p-4 md:block">
      <div className="mb-3 px-2 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">Navigate</div>

      <div className="space-y-1">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm capitalize transition-colors ${
              active === item.id
                ? "border border-emerald-700/60 bg-emerald-900/40 text-emerald-300"
                : "text-zinc-300 hover:bg-zinc-900 hover:text-zinc-100"
            }`}
          >
            <span className="inline-block w-4 text-center text-xs">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <div className="mb-3 mt-5 px-2 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">Topics</div>
      <div className="space-y-1">
        {TOPIC_TAGS.map((topic) => (
          <button
            key={topic.id}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm capitalize text-zinc-300 transition-colors hover:bg-zinc-900 hover:text-zinc-100"
          >
            <span className={`inline-block w-4 text-center text-[10px] ${topic.color}`}>■</span>
            <span>{topic.id}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}

export function RightPanel() {
  return (
    <aside className="sticky top-[118px] hidden h-[calc(100vh-118px)] overflow-y-auto border-l border-zinc-800/80 p-4 lg:block">
      <section className="mb-6">
        <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">Trending Tags</div>
        {TRENDING_TAGS.map((tag, index) => (
          <button
            key={tag.name}
            className="flex w-full gap-3 border-b border-zinc-800/70 py-2 text-left last:border-none hover:opacity-90"
          >
            <span className="w-4 font-mono text-xs text-zinc-600">#{index + 1}</span>
            <div>
              <div className="font-mono text-sm text-cyan-300">{tag.name}</div>
              <div className="text-xs text-zinc-500">{tag.count}</div>
            </div>
          </button>
        ))}
      </section>

      <section>
        <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">Who To Follow</div>
        <div className="space-y-2">
          {WHO_TO_FOLLOW.map((user) => (
            <div key={user.name} className="flex items-center gap-2 rounded-xl px-1 py-1">
              <Avatar initials={user.initials} gradient={user.gradient} />
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium text-zinc-100">{user.name}</div>
                <div className="text-xs text-zinc-500">{user.role}</div>
              </div>
              <button className="rounded-lg border border-zinc-700 bg-zinc-900 px-2 py-1 font-mono text-[11px] text-zinc-300 transition-colors hover:border-emerald-500 hover:text-emerald-300">
                follow
              </button>
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
}

export function AppShell({ user, activePage, onNavigate, unreadCount, showTabs, showRightPanel, children }) {
  return (
    <div
      className="min-h-screen text-zinc-100"
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background:
          "radial-gradient(circle at 20% 0%, rgba(16,185,129,0.13), transparent 28%), radial-gradient(circle at 85% 0%, rgba(56,189,248,0.10), transparent 24%), #09090b",
      }}
    >
      <TopBar user={user} onNavigate={onNavigate} />
      {showTabs && <Tabs active={activePage} onChange={onNavigate} unreadCount={unreadCount} />}

      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 md:grid-cols-[240px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)_280px]">
        <Sidebar active={activePage} onNavigate={onNavigate} />
        <main className="min-w-0 pb-8">{children}</main>
        {showRightPanel && <RightPanel />}
      </div>

      <button
        onClick={() => onNavigate("trending")}
        className="fixed bottom-4 right-4 flex items-center gap-2 rounded-full border border-emerald-700/60 bg-zinc-900/95 px-4 py-2 font-mono text-xs text-emerald-300 shadow-lg md:hidden"
      >
        <FiCompass />
        Explore
      </button>
    </div>
  );
}

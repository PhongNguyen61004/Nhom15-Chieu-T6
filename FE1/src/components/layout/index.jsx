import "./index.css";
import { FiCompass, FiSearch } from "react-icons/fi";
import { Avatar } from "../ui";
import { NAV_ITEMS, TOPIC_TAGS, TRENDING_TAGS, WHO_TO_FOLLOW } from "../../constants/mockData";
import { useState } from "react";


export function TopBar({ user, onNavigate, onLogout }) {
  const [open, setOpen] = useState(false);

  const initials =
    user?.initials ||
    user?.name?.charAt(0)?.toUpperCase() ||
    user?.username?.charAt(0)?.toUpperCase() ||
    "U";

  const gradient = user?.gradient || "from-gray-500 to-gray-700";

  return (
    <header className="topbar">
      <div className="topbar-inner">
        {/* LEFT */}
        <div className="topbar-left">
          <button onClick={() => onNavigate("feed")} className="logo">
            devlog
          </button>

          <div className="search-box">
            <FiSearch className="search-icon" />
            <input placeholder="Search posts, tags, people..." />
          </div>
        </div>

        {/* RIGHT */}
        <div className="topbar-right">
          <button onClick={() => onNavigate("editor")} className="btn-new">
            + New Post
          </button>

          {user && (
            <div className="topbar-user">
              <Avatar
                initials={initials}
                gradient={gradient}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(prev => !prev);
                }}
              />

              {open && (
                <div
                  className="topbar-dropdown"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button onClick={() => onNavigate("profile")}>
                    Profile
                  </button>
                  <button onClick={onLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

// ─── Tabs ─────────────────────────────
export function Tabs({ active, onChange, unreadCount }) {
  const items = [
    { id: "feed", label: "feed" },
    { id: "trending", label: "trending" },
    { id: "notifications", label: "notifications", badge: unreadCount },
  ];

  return (
    <nav className="tabs">
      <div className="tabs-inner">
        {items.map(tab => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`tab ${active === tab.id ? "active" : ""}`}
          >
            {tab.label}
            {tab.badge > 0 && <span className="badge">{tab.badge}</span>}
          </button>
        ))}
      </div>
    </nav>
  );
}

// ─── Sidebar ─────────────────────────────

export function Sidebar({ active, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">Navigate</div>

      <div className="nav-list">
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`nav-item ${active === item.id ? "active" : ""}`}
          >
            <span className="icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <div className="sidebar-title">Topics</div>

      <div className="topic-list">
        {TOPIC_TAGS.map(topic => (
          <button key={topic.id} className="topic-item">
            <span className={`topic-color ${topic.color}`}>■</span>
            <span>{topic.id}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}

// ─── RightPanel ─────────────────────────

export function RightPanel() {
  return (
    <aside className="right-panel">
      <section>
        <div className="panel-title">Trending Tags</div>
        {TRENDING_TAGS.map((tag, i) => (
          <button key={tag.name} className="trending-item">
            <span className="index">{i + 1}</span>
            <div>
              <div className="tag-name">{tag.name}</div>
              <div className="tag-count">{tag.count}</div>
            </div>
          </button>
        ))}
      </section>

      <section>
        <div className="panel-title">Who To Follow</div>
        <div className="follow-list">
          {WHO_TO_FOLLOW.map(user => (
            <div key={user.name} className="follow-item">
              <Avatar initials={user.initials} gradient={user.gradient} />
              <div className="follow-info">
                <div className="name">{user.name}</div>
                <div className="role">{user.role}</div>
              </div>
              <button className="btn-follow">follow</button>
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
}

// ─── AppShell ───────────────────────────

export function AppShell({
  user,
  activePage,
  onNavigate,
  onLogout,
  unreadCount,
  showTabs,
  showRightPanel,
  children
}) {
  return (
    <div className="app-shell">
      <TopBar user={user} onNavigate={onNavigate} onLogout={onLogout} />
      {showTabs && <Tabs active={activePage} onChange={onNavigate} unreadCount={unreadCount} />}

      <div className="layout">
        <Sidebar active={activePage} onNavigate={onNavigate} />
        <main className="main">{children}</main>
        {showRightPanel && <RightPanel />}
      </div>

      <button onClick={() => onNavigate("trending")} className="mobile-explore">
        <FiCompass />
        Explore
      </button>
    </div>
  );
}
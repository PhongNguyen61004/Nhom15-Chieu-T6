// ─── APP.JSX ─────────────────────────────────────────────────────────────────
import { useState } from "react";
import { AppShell } from "./components/layout";
import { useCurrentUser, useNotifications } from "./hooks";

import FeedPage from "./pages/FeedPage";
import DetailPage from "./pages/DetailPage";
import { TrendingPage } from "./pages/TrendingPage";
import NotificationsPage from "./pages/NotificationsPage";
import ProfilePage from "./pages/ProfilePage";
import EditorPage from "./pages/EditorPage";
import AuthPage from './pages/AuthPage';

const TAB_PAGES = ["feed", "trending", "notifications"];

export default function App() {
  const [activePage, setActivePage] = useState("feed");
  const [detailPost, setDetailPost] = useState(null);

  const { user: currentUser } = useCurrentUser();
  const { notifs, unreadCount, markRead, markAllRead } = useNotifications();


  const token = localStorage.getItem("token");
  if (!token) {
    return <AuthPage onSuccess={() => window.location.reload()} />;
  }


  function navigate(page) {
    setActivePage(page);
    setDetailPost(null);
  }

  function openPost(post) {
    setDetailPost(post);
    setActivePage("feed");
  }

  function renderPage() {
    if (detailPost) {
      return <DetailPage post={detailPost} onBack={() => setDetailPost(null)} />;
    }
    switch (activePage) {
      case "feed": return <FeedPage onOpenPost={openPost} />;
      case "trending": return <TrendingPage onOpenPost={openPost} />;
      case "notifications": return <NotificationsPage />;
      case "profile": return <ProfilePage onOpenPost={openPost} />;
      case "editor": return <EditorPage onSuccess={() => navigate("feed")} />;
      default: return <FeedPage onOpenPost={openPost} />;
    }
  }

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=DM+Sans:wght@400;500;600&display=swap"
      />
      <AppShell
        user={currentUser}
        activePage={activePage}
        onNavigate={navigate}
        unreadCount={unreadCount}
        showTabs={TAB_PAGES.includes(activePage) && !detailPost}
        showRightPanel={TAB_PAGES.includes(activePage) && !detailPost}
      >
        {renderPage()}
      </AppShell>
    </>
  );
}

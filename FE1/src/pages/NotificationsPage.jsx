// ─── NOTIFICATIONS PAGE ───────────────────────────────────────────────────────

import { useNotifications } from "../hooks";
import { NotifList } from "../components/notification";

export default function NotificationsPage() {
  const { notifs, markRead, markAllRead } = useNotifications();

  return (
    <NotifList
      notifs={notifs}
      onRead={markRead}
      onMarkAllRead={markAllRead}
    />
  );
}

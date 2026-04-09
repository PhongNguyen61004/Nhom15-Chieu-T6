# devlog_ — dev community UI

Dark brutalist dev community — built with React 18 + Tailwind CSS 3.

---

## Cấu trúc thư mục

```
src/
├── types/
│   └── index.js              ← JSDoc shapes (Post, Comment, User, ...)
│
├── constants/
│   └── mockData.js           ← Toàn bộ mock data — xóa khi có API thật
│
├── services/
│   └── api.js                ← TẤT CẢ fetch calls — component không fetch trực tiếp
│
├── hooks/
│   └── index.js              ← Custom hooks: usePosts, useComments, useNotifications, ...
│
├── components/
│   ├── ui/                   ← Atomic UI: Avatar, Tag, Button, Card, CodeBlock, ...
│   ├── layout/               ← TopBar, Sidebar, RightPanel, Tabs, AppShell
│   ├── post/                 ← PostCard, PostFeed, MiniPostCard
│   ├── comment/              ← CommentBox, CommentItem, CommentList
│   ├── profile/              ← ProfileHero, SkillBar
│   ├── notification/         ← NotifItem, NotifList
│   └── editor/               ← EditorToolbar, PostEditor
│
├── pages/
│   ├── FeedPage.jsx          ← Hook + Component, không có logic thừa
│   ├── DetailPage.jsx
│   ├── TrendingPage.jsx
│   ├── NotificationsPage.jsx
│   ├── ProfilePage.jsx
│   └── EditorPage.jsx
│
├── App.jsx                   ← Router (useState) + AppShell
├── main.jsx                  ← Entry point
└── index.css                 ← Tailwind + global styles
```

---

## Cài đặt & chạy

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
```

---

## Gắn API vào

### Bước 1 — Cấu hình base URL

Tạo file `.env.local`:
```
VITE_API_URL=http://localhost:4000/api
```

### Bước 2 — Thêm auth token (nếu cần)

Mở `src/services/api.js`, bỏ comment dòng Authorization:
```js
// Authorization: `Bearer ${localStorage.getItem("token")}`,
```

### Bước 3 — Swap mock → real trong hooks

Mỗi hook có comment chỉ rõ chỗ cần sửa. Ví dụ trong `usePosts`:

```js
// TRƯỚC (mock):
const [posts, setPosts] = useState(MOCK_POSTS);

// SAU (API thật):
const { data: posts, loading, error } = useFetch(
  () => postService.getAll({ sort, tag }),
  [sort, tag]
);
```

Hook `useFetch` đã có sẵn trong `hooks/index.js` — dùng lại được.

### Bước 4 — Bỏ comment TODO trong service

`src/services/api.js` đã định nghĩa sẵn tất cả endpoints:

| Service            | Method          | Endpoint                        |
|--------------------|-----------------|----------------------------------|
| `postService`      | `getAll`        | `GET /posts?sort=&tag=`         |
| `postService`      | `getById`       | `GET /posts/:id`                |
| `postService`      | `create`        | `POST /posts`                   |
| `postService`      | `toggleLike`    | `POST /posts/:id/like`          |
| `commentService`   | `getByPost`     | `GET /posts/:id/comments`       |
| `commentService`   | `create`        | `POST /posts/:id/comments`      |
| `userService`      | `getMe`         | `GET /users/me`                 |
| `userService`      | `getByHandle`   | `GET /users/:handle`            |
| `userService`      | `toggleFollow`  | `POST /users/:id/follow`        |
| `notificationService` | `getAll`     | `GET /notifications`            |
| `notificationService` | `markAllRead`| `POST /notifications/read-all`  |

---

## Thêm trang mới

1. Tạo `src/pages/MyNewPage.jsx`
2. Thêm case vào `renderPage()` trong `App.jsx`
3. Thêm nav item vào `NAV_ITEMS` trong `constants/mockData.js`

---

## Chuyển sang TypeScript

1. Đổi `.js` → `.ts`, `.jsx` → `.tsx`
2. Copy JSDoc từ `src/types/index.js` → `src/types/index.ts` (đổi sang `interface`)
3. `npm install typescript @types/react @types/react-dom`
4. Thêm `tsconfig.json`

---

## Dependencies có thể thêm sau

| Thư viện | Dùng cho |
|---|---|
| `react-router-dom` | Thay routing bằng useState |
| `react-markdown` | Render markdown trong DetailPage |
| `@tanstack/react-query` | Thay `useFetch` hook — cache, refetch, optimistic updates |
| `zustand` | Global state nếu app phức tạp hơn |
| `react-hot-toast` | Toast notifications |
| `framer-motion` | Animations |

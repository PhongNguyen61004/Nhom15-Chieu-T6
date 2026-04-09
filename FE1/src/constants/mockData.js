// ─── MOCK DATA ───────────────────────────────────────────────────────────────
// TODO: xóa file này khi đã có API thật — mỗi service sẽ tự fetch data

export const MOCK_POSTS = [
  {
    id: 1,
    author: { name: "Alex Kim", initials: "AK", gradient: "from-orange-400 to-yellow-400" },
    timeAgo: "2h ago",
    readTime: "6 min read",
    title: "Rust ownership model vs Go's garbage collector — a real-world perf deep dive",
    excerpt:
      "After rewriting our event pipeline in both Rust and Go, here's what the numbers actually look like under 50k req/s...",
    code: {
      lang: "rust",
      snippet: `fn process_events(buf: Vec<Event>) -> Result<(), PipelineError> {\n  buf.into_iter().try_for_each(|e| handle(e))\n}`,
    },
    tags: [
      { label: "rust",        color: "bg-orange-950 text-orange-300 border-orange-800" },
      { label: "golang",      color: "bg-teal-950   text-teal-300   border-teal-800"   },
      { label: "performance", color: "bg-zinc-800   text-zinc-300   border-zinc-700"   },
    ],
    upvotes: 284,
    comments: 47,
    liked: true,
  },
  {
    id: 2,
    author: { name: "Maya Reyes", initials: "MR", gradient: "from-purple-500 to-pink-500" },
    timeAgo: "5h ago",
    readTime: "4 min read",
    title: "CSS container queries just fixed the component I've been fighting for 2 years",
    excerpt:
      "Forget viewport media queries — container queries let components respond to their own parent. Here's the pattern that changed everything...",
    code: {
      lang: "css",
      snippet: `.card-wrapper { container-type: inline-size }\n@container (min-width: 400px) {\n  .card { display: grid; grid-template-columns: 1fr 2fr }\n}`,
    },
    tags: [
      { label: "css",      color: "bg-purple-950 text-purple-300 border-purple-800" },
      { label: "frontend", color: "bg-cyan-950   text-cyan-300   border-cyan-800"   },
    ],
    upvotes: 196,
    comments: 31,
    liked: false,
  },
  {
    id: 3,
    author: { name: "Jordan Soto", initials: "JS", gradient: "from-cyan-400 to-blue-500" },
    timeAgo: "yesterday",
    readTime: "8 min read",
    title: "Building a real-time query engine with PostgreSQL LISTEN/NOTIFY + React",
    excerpt:
      "Skip polling, skip WebSocket complexity. Postgres has had pub/sub built-in for decades and nobody talks about it enough...",
    code: null,
    tags: [
      { label: "postgres",   color: "bg-red-950    text-red-300    border-red-800"    },
      { label: "react",      color: "bg-cyan-950   text-cyan-300   border-cyan-800"   },
      { label: "javascript", color: "bg-yellow-950 text-yellow-300 border-yellow-800" },
    ],
    upvotes: 512,
    comments: 89,
    liked: false,
  },
];

export const MOCK_COMMENTS = [
  {
    id: 1,
    author: "Sara Russo",
    initials: "SR",
    gradient: "from-purple-500 to-pink-500",
    time: "1h ago",
    text: "The GC pause numbers match exactly what we saw. Did you try tuning GOGC before the rewrite? We got p99 down to ~15ms with GOGC=400.",
    upvotes: 12,
  },
  {
    id: 2,
    author: "Tom Chen",
    initials: "TC",
    gradient: "from-cyan-400 to-blue-500",
    time: "45m ago",
    text: "What Tokio version are you on? There was a regression in 1.35 around channel throughput that might affect these numbers.",
    upvotes: 5,
  },
];

export const MOCK_NOTIFICATIONS = [
  { id: 1, read: false, actor: "Alex Kim",    initials: "AK", gradient: "from-orange-400 to-yellow-400", text: `upvoted your comment on "Async patterns in Node.js"`,         time: "10 min ago" },
  { id: 2, read: false, actor: "Maya Reyes",  initials: "MR", gradient: "from-purple-500 to-pink-500",   text: `replied: "That's exactly the issue I hit too..."`,            time: "1h ago"     },
  { id: 3, read: false, actor: "Jordan Soto", initials: "JS", gradient: "from-cyan-400 to-blue-500",     text: "started following you",                                       time: "3h ago"     },
  { id: 4, read: true,  actor: "Tom Chen",    initials: "TC", gradient: "from-zinc-400 to-zinc-600",     text: `upvoted your post "Building zero-downtime deploys with pg"`, time: "yesterday"  },
];

export const TRENDING_TAGS = [
  { name: "rust",       count: "48 posts" },
  { name: "typescript", count: "41 posts" },
  { name: "postgres",   count: "36 posts" },
  { name: "react",      count: "29 posts" },
];

export const WHO_TO_FOLLOW = [
  { name: "Alex Kim",    role: "systems eng",  initials: "AK", gradient: "from-orange-400 to-yellow-400" },
  { name: "Maya Reyes",  role: "frontend dev", initials: "MR", gradient: "from-purple-500 to-pink-500"   },
  { name: "Jordan Soto", role: "backend · db", initials: "JS", gradient: "from-cyan-400 to-blue-500"     },
];

export const CURRENT_USER = {
  name: "Nguyen Thanh",
  initials: "NT",
  gradient: "from-green-400 to-cyan-400",
  handle: "@ngthanh",
  joinedAt: "Jan 2023",
  bio: "fullstack dev · obsessed with perf, distributed systems, and clean abstractions. building things at @acme",
  skills: [
    { name: "typescript", level: 90 },
    { name: "rust",       level: 60 },
    { name: "postgres",   level: 80 },
    { name: "react",      level: 85 },
    { name: "docker",     level: 70 },
  ],
  stats: { posts: 24, followers: "1.4k", following: 312, upvotes: "8.2k" },
};

export const NAV_ITEMS = [
  { id: "feed",    icon: "◈", label: "feed"    },
  { id: "profile", icon: "◉", label: "profile" },
  { id: "editor",  icon: "◫", label: "write"   },
  { id: "saved",   icon: "◷", label: "saved"   },
];

export const TOPIC_TAGS = [
  { id: "javascript", color: "text-yellow-400" },
  { id: "rust",       color: "text-orange-400" },
  { id: "react",      color: "text-cyan-400"   },
  { id: "golang",     color: "text-teal-400"   },
  { id: "css",        color: "text-purple-400" },
];

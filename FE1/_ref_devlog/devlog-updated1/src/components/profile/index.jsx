// ─── PROFILE COMPONENTS ──────────────────────────────────────────────────────
// ProfileHero, SkillBar

import { Avatar, StatRow } from "../ui";

// ─── SkillBar ─────────────────────────────────────────────────────────────────

export function SkillBar({ name, level }) {
  return (
    <div className="flex items-center gap-2 bg-zinc-800 border border-zinc-700 rounded px-2.5 py-1">
      <span className="font-mono text-xs text-cyan-300">{name}</span>
      <div className="w-8 h-0.5 bg-zinc-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-cyan-400 rounded-full transition-all duration-500"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}

// ─── ProfileHero ──────────────────────────────────────────────────────────────

/**
 * @param {{ user: import("../../types").User, isOwnProfile?: boolean, isFollowing?: boolean, onFollow?: Function, onEdit?: Function }} props
 */
export function ProfileHero({ user, isOwnProfile = false, isFollowing = false, onFollow, onEdit }) {
  const stats = [
    { label: "posts",     value: user.stats.posts     },
    { label: "followers", value: user.stats.followers },
    { label: "following", value: user.stats.following },
    { label: "upvotes",   value: user.stats.upvotes   },
  ];

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-4">
      {/* Top row: avatar + info + action */}
      <div className="flex items-start gap-4 mb-4">
        <Avatar initials={user.initials} gradient={user.gradient} size="lg" />

        <div className="flex-1">
          <div className="text-lg font-bold text-zinc-100">{user.name}</div>
          <div className="font-mono text-xs text-zinc-500 mb-2">
            {user.handle} · joined {user.joinedAt}
          </div>
          <div className="text-sm text-zinc-400 leading-relaxed">{user.bio}</div>
        </div>

        {isOwnProfile ? (
          <button
            onClick={onEdit}
            className="bg-zinc-800 border border-zinc-700 rounded-md px-3 py-1.5 text-xs font-mono text-zinc-400 hover:border-green-500 hover:text-green-400 transition-colors flex-shrink-0"
          >
            edit profile
          </button>
        ) : (
          <button
            onClick={onFollow}
            className={`rounded-md px-3 py-1.5 text-xs font-mono transition-colors flex-shrink-0 border ${
              isFollowing
                ? "bg-green-950 border-green-800 text-green-400"
                : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-green-500 hover:text-green-400"
            }`}
          >
            {isFollowing ? "following" : "follow"}
          </button>
        )}
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-5">
        {user.skills.map(s => <SkillBar key={s.name} {...s} />)}
      </div>

      {/* Stats */}
      <StatRow stats={stats} />
    </div>
  );
}

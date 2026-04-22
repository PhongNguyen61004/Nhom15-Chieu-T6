import "./index.css";
import { Avatar, StatRow } from "../ui";

// ─── SkillBar ───────────────────────────
export function SkillBar({ name = "", level = 0 }) {
  return (
    <div className="skill-bar">
      <span className="skill-name">{name}</span>

      <div className="skill-track">
        <div
          className="skill-fill"
          style={{ width: `${Math.min(Math.max(level, 0), 100)}%` }}
        />
      </div>
    </div>
  );
}

// ─── ProfileHero ────────────────────────
export function ProfileHero({
  user,
  isOwnProfile = false,
  isFollowing = false,
  onFollow,
  onEdit
}) {
  
  const safeUser = user || {};

  const stats = [
    { label: "posts", value: safeUser?.stats?.posts || 0 },
    { label: "followers", value: safeUser?.stats?.followers || 0 },
    { label: "following", value: safeUser?.stats?.following || 0 },
    { label: "upvotes", value: safeUser?.stats?.upvotes || 0 },
  ];

  const skills = Array.isArray(safeUser?.skills) ? safeUser.skills : [];

  return (
    <div className="profile-hero">
      {/* Top */}
      <div className="profile-top">
        <Avatar
          initials={
            safeUser?.initials ||
            safeUser?.name?.charAt(0)?.toUpperCase() ||
            "U"
          }
          gradient={safeUser?.gradient || "from-gray-500 to-gray-700"}
          size="lg"
        />

        <div className="profile-info">
          <div className="profile-name">
            {safeUser?.name || "Unknown user"}
          </div>

          <div className="profile-meta">
            {(safeUser?.handle || "@user")} · joined{" "}
            {safeUser?.joinedAt || "-"}
          </div>

          <div className="profile-bio">
            {safeUser?.bio || ""}
          </div>
        </div>

        {isOwnProfile ? (
          <button onClick={onEdit} className="btn-edit">
            edit profile
          </button>
        ) : (
          <button
            onClick={onFollow}
            className={`btn-follow ${isFollowing ? "following" : ""}`}
          >
            {isFollowing ? "following" : "follow"}
          </button>
        )}
      </div>

      {/* Skills */}
      <div className="profile-skills">
        {skills.map((s, idx) => (
          <SkillBar
            key={s.name || idx}
            name={s.name || ""}
            level={typeof s.level === "number" ? s.level : 0}
          />
        ))}
      </div>

      {/* Stats */}
      <StatRow stats={stats} />
    </div>
  );
}
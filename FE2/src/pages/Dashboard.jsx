import { useEffect } from "react";
import { getStats } from "../api/api";

export default function Dashboard({ setStats, stats }) {
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await getStats(token);
        // Map đúng key từ API trả về
        const data = {
          users: res.data.totalUsers || 0,
          posts: res.data.totalPosts || 0,
          comments: res.data.totalComments || 0,
          likes: res.data.totalReactions || 0,
          tags: res.data.totalTags || 0
        };
        setStats(data);
      } catch (err) {
        console.error("Lỗi khi fetch stats:", err);
      }
    };

    fetchStats();
  }, [setStats]);

  return (
    <div className="page-card">
      <h2>Dashboard Overview</h2>
      <p>Welcome back, Admin 🚀</p>
      
      <div className="stats-grid" style={{ marginTop: '20px' }}>
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{stats?.users ?? "Loading..."}</p>
        </div>
        <div className="stat-card">
          <h3>Total Posts</h3>
          <p>{stats?.posts ?? "Loading..."}</p>
        </div>
        <div className="stat-card">
          <h3>Comments</h3>
          <p>{stats?.comments ?? "Loading..."}</p>
        </div>
        <div className="stat-card">
          <h3>Tags</h3>
          <p>{stats?.tags ?? "Loading..."}</p>
        </div>
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
import API from "../api/api";

export default function Dashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    API.admin.stats().then((res) => {
      setStats(res.data.data);
    });
  }, []);

  return (
    <div className="page-card">
      <div className="page-header">
        <h2>Dashboard</h2>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{stats.users || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Total Posts</h3>
          <p>{stats.posts || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Total Comments</h3>
          <p>{stats.comments || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Total Likes</h3>
          <p>{stats.likes || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Total Shares</h3>
          <p>{stats.shares || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Total Follows</h3>
          <p>{stats.follows || 0}</p>
        </div>
      </div>
    </div>
  );
}
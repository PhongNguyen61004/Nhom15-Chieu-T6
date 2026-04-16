import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Rightbar from "./components/Rightbar";

import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Roles from "./pages/Roles";
import Posts from "./pages/Posts";
import Comments from "./pages/Comments";

import API from "./api/api";

export default function App() {
  const [stats, setStats] = useState({
    users: 0,
    posts: 0,
    comments: 0,
    likes: 0,
    shares: 0,
    follows: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.admin.stats();
      setStats(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="layout">
      <Sidebar />

      <div className="content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/comments" element={<Comments />} />
        </Routes>
      </div>

      <Rightbar stats={stats} />
    </div>
  );
}
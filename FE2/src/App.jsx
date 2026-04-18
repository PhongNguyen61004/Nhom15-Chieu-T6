import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Rightbar from "./components/Rightbar";
import Modal from "./components/Modal";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Posts from "./pages/Posts";
import Comments from "./pages/Comments";
import Tags from "./pages/Tags";

import "./App.css";
import { useState, useEffect } from "react";

export default function App() {
  const [stats, setStats] = useState({});

  useEffect(() => {
  const manualToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZTIzZTAwNzhmMjI1MjJiNjNlYTlkZCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3NjQ5NjI1OCwiZXhwIjoxNzc2NTgyNjU4fQ.CNn3pxytfTgK6N2WLNVUI02NMye4rUfcBNjSSmtaUfA"; 
  localStorage.setItem("token", manualToken);
}, []);

  return (
    <div className="layout">
      <Sidebar />

      <div className="content">
        <Routes>
          <Route path="/" element={<Dashboard setStats={setStats} stats={stats} />} />
          <Route path="/users" element={<Users />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/tags" element={<Tags />} />
        </Routes>
      </div>

      <Rightbar stats={stats} />
    </div>
  );
}
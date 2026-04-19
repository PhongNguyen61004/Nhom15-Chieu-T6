import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Rightbar from "./components/Rightbar";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Posts from "./pages/Posts";
import Comments from "./pages/Comments";
import Tags from "./pages/Tags";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";
import { useState } from "react";

export default function App() {
  const [stats, setStats] = useState({});
  const token = localStorage.getItem("token");

  return (
    <Routes>
      {/* LOGIN */}
      <Route path="/login" element={<Login />} />

      {/* PRIVATE ROUTES */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
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
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
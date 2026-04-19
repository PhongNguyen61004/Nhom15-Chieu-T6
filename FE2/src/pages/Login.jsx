import { useState } from "react";
import { login } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(form);

      // lưu token
      localStorage.setItem("token", res.token);

      // chuyển về dashboard
      navigate("/");
    } catch (err) {
      alert(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f6f8fa" // Đồng bộ với màu nền body của App
    }}>
      <div 
        className="page-card" 
        style={{ 
          width: "340px", 
          padding: "32px", 
          boxShadow: "0 8px 24px rgba(140, 149, 159, 0.2)" // Thêm shadow nhẹ cho nổi bật giữa màn hình
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <h2 style={{ margin: 0, color: "#24292f", fontSize: "24px" }}>Admin Login</h2>
          <p style={{ color: "#57606a", fontSize: "14px", marginTop: "8px" }}>Sign in to manage DevBlog</p>
        </div>

        {/* Sử dụng class modal-form có sẵn để hưởng CSS của input focus, gap */}
        <form onSubmit={handleSubmit} className="modal-form">
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#24292f", marginBottom: "8px" }}>
              Email address
            </label>
            <input
              type="email"
              placeholder="admin@example.com"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#24292f", marginBottom: "8px" }}>
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button 
            className="github-btn" 
            type="submit" 
            disabled={loading}
            style={{ marginTop: "8px", width: "100%", padding: "10px", fontSize: "15px", fontWeight: "600" }}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
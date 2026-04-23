import { useEffect, useState } from "react";
import { getPosts } from "../api/api";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  const fetchData = async () => {
    const res = await getPosts();
    setPosts(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="page-card">
      <div className="page-header">
        <h2>Posts</h2>
      </div>
      <div
        className="post-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px"
        }}
      >
        {posts.map((p) => (
          <div
            key={p._id}
            className="post-card"
            style={{
              border: "1px solid #d0d7de",
              padding: "16px",
              borderRadius: "8px"
            }}
          >
            <h3 style={{ marginTop: 0 }}>{p.title}</h3>
            <p style={{ color: "#57606a", fontSize: "14px" }}>
              {p.content.substring(0, 100)}...
            </p>
            <p>
              <span className="badge">{p.status}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
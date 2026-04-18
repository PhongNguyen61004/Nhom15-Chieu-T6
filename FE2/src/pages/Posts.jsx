import { useEffect, useState } from "react";
import { getPosts, deletePost, createPost, updatePost } from "../api/api";
import Modal from "../components/Modal";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    authorId: "",
    status: "published"
  });

  const fetchData = async () => {
    const res = await getPosts();
    setPosts(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  const handleOpenModal = (post = null) => {
    if (post) {
      setEditingId(post._id);
      setFormData({
        title: post.title,
        slug: post.slug || "",
        content: post.content,
        authorId: post.authorId,
        status: post.status || "published"
      });
    } else {
      setEditingId(null);
      setFormData({
        title: "",
        slug: "",
        content: "",
        authorId: "",
        status: "published"
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updatePost(editingId, formData);
      } else {
        await createPost(formData);
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      alert("Lỗi: " + (err.message || "Slug có thể bị trùng hoặc thiếu dữ liệu"));
    }
  };

  return (
    <div className="page-card">
      <div className="page-header">
        <h2>Posts</h2>
        <button className="github-btn" onClick={() => handleOpenModal()}>
          Add Post
        </button>
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

            <div
              className="post-footer"
              style={{ marginTop: "16px", display: "flex", gap: "8px" }}
            >
              <button className="edit-btn" onClick={() => handleOpenModal(p)}>
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => deletePost(p._id).then(fetchData)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <Modal
          title={editingId ? "Edit Post" : "Add Post"}
          onClose={() => setIsModalOpen(false)}
        >
          <form onSubmit={handleSubmit} className="modal-form">
            <input
              placeholder="Title"
              required
              value={formData.title}
              onChange={(e) => {
                const title = e.target.value;
                setFormData({
                  ...formData,
                  title,
                  slug: generateSlug(title) // 👉 auto slug
                });
              }}
            />

            {/* ✅ THÊM FIELD SLUG */}
            <input
              placeholder="Slug (auto or custom)"
              required
              value={formData.slug}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
            />

            <textarea
              placeholder="Content"
              required
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              style={{ minHeight: "120px" }}
            />

            <input
              placeholder="Author ID (ObjectId)"
              required
              value={formData.authorId}
              onChange={(e) =>
                setFormData({ ...formData, authorId: e.target.value })
              }
            />

            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="pending">Pending</option>
            </select>

            <button className="github-btn" type="submit">
              Save
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}
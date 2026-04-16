import { useEffect, useState } from "react";
import API from "../api/api";
import AddPostModal from "../components/AddPostModal";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchPosts = async () => {
    try {
      const res = await API.posts.getAll();
      setPosts(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const deletePost = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa post?");
    if (!confirmDelete) return;

    try {
      await API.posts.delete(id);
      fetchPosts();
      alert("Xóa post thành công");
    } catch (error) {
      console.log(error);
      alert("Xóa thất bại");
    }
  };

  const updatePost = async (post) => {
    const title = prompt("Nhập tiêu đề mới", post.title);
    const content = prompt("Nhập nội dung mới", post.content);

    if (!title || !content) return;

    try {
      await API.posts.update(post._id, {
        title,
        content,
      });

      fetchPosts();
      alert("Cập nhật post thành công");
    } catch (error) {
      console.log(error);
      alert("Cập nhật thất bại");
    }
  };

  return (
    <div className="page-card">
      <div className="page-header">
        <h2>Posts Management</h2>

        <button
          className="github-btn"
          onClick={() => setShowModal(true)}
        >
          + Add Post
        </button>
      </div>

      {showModal && (
        <AddPostModal
          onClose={() => setShowModal(false)}
          onSuccess={fetchPosts}
        />
      )}

      <div className="post-grid">
        {posts.map((p) => (
          <div key={p._id} className="post-card">
            <h3>{p.title}</h3>
            <p>{p.content}</p>

            <div className="post-footer">
              <span className="badge">{p.status}</span>

              <div>
                <button
                  className="edit-btn"
                  onClick={() => updatePost(p)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deletePost(p._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
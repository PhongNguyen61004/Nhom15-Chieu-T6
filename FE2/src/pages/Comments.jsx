import { useEffect, useState } from "react";
import API from "../api/api";

export default function Comments() {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const res = await API.comments.getAll();
    setComments(res.data.data);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const deleteComment = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa comment này?");
    if (!confirmDelete) return;

    try {
      await API.comments.delete(id);
      fetchComments();
      alert("Xóa comment thành công");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page-card">
      <div className="page-header">
        <h2>Comments Management</h2>
      </div>

      <table className="github-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nội dung</th>
            <th>User ID</th>
            <th width="120">Actions</th>
          </tr>
        </thead>

        <tbody>
          {comments.map((c) => (
            <tr key={c._id}>
              <td>{c._id}</td>
              <td>{c.content}</td>
              <td>{c.userId}</td>
              <td>
                <button 
                  className="delete-btn" 
                  onClick={() => deleteComment(c._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
import { commentAPI } from "../../services/api";

export default function CommentTable({ comments, reload, onEdit }) {
  const handleDelete = async (id) => {
    try {
      await commentAPI.delete(id);
      reload();
    } catch (err) {
      console.error(err);
      alert("Ẩn comment thất bại!");
    }
  };

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>UserID</th>
          <th>Content</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {(comments || []).map((c) => (
          <tr key={c._id}>
            <td>{c._id}</td>
            <td>{c.userId}</td>
            <td>{c.content}</td>
            <td>{c.isDeleted ? "Đã ẩn" : "Hiển thị"}</td>
            <td>
  <button
    className="action-btn btn-edit"
    onClick={() => onEdit(c)}
  >
    Xem
  </button>

  <button
    className="action-btn btn-delete"
    onClick={() => handleDelete(c._id)}
    disabled={c.isDeleted}
  >
    Ẩn
  </button>
</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

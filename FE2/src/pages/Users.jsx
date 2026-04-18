import { useEffect, useState } from "react";
import {
  getUsers,
  deleteUser,
  banUser,
  unbanUser,
  createUser,
  updateUser
} from "../api/api";
import Modal from "../components/Modal";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    role: "user"
  });

  const fetchData = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách user:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleBan = async (user) => {
    try {
      if (user.isBanned) {
        await unbanUser(user._id);
      } else {
        await banUser(user._id);
      }
      fetchData(); // Refresh UI ngay lập tức
    } catch (error) {
      console.error("Lỗi ban/unban:", error);
    }
  };

  const handleOpenModal = (user = null) => {
    if (user) {
      setEditingId(user._id);
      setFormData({
        username: user.username || "",
        name: user.name || "",
        email: user.email || "",
        password: "", // Không hiển thị password cũ
        role: user.role || "user"
      });
    } else {
      setEditingId(null);
      setFormData({ username: "", name: "", email: "", password: "", role: "user" });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const payload = { ...formData };
        if (!payload.password) delete payload.password; // Tránh cập nhật password rỗng
        await updateUser(editingId, payload);
      } else {
        await createUser(formData);
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("Lỗi khi lưu user:", error);
      alert("Có lỗi xảy ra: " + (error.message || "Kiểm tra lại dữ liệu"));
    }
  };

  return (
    <div className="page-card">
      <div className="page-header">
        <h2>Users</h2>
        <button className="github-btn" onClick={() => handleOpenModal()}>Add User</button>
      </div>

      <table className="github-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.username}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <span className="badge" style={{
                  background: u.isBanned ? "#ffebe9" : "#ddf4ff",
                  color: u.isBanned ? "#da3633" : "#0969da"
                }}>
                  {u.isBanned ? "Banned" : "Active"}
                </span>
              </td>
              <td>
                <button
                  className="edit-btn"
                  style={{ background: u.isBanned ? "#2ea043" : "#da3633" }}
                  onClick={() => handleToggleBan(u)}
                >
                  {u.isBanned ? "Unban" : "Ban"}
                </button>
                <button className="edit-btn" onClick={() => handleOpenModal(u)}>Edit</button>
                <button className="delete-btn" onClick={() => deleteUser(u._id).then(fetchData)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <Modal title={editingId ? "Edit User" : "Add User"} onClose={() => setIsModalOpen(false)}>
          <form onSubmit={handleSubmit} className="modal-form">
            <input placeholder="Username" required value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })} />
            <input placeholder="Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
            <input placeholder="Email" type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
            <input placeholder={editingId ? "Password (leave blank to keep)" : "Password"} type="password" required={!editingId} value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />
            <select value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <button className="github-btn" type="submit">Save</button>
          </form>
        </Modal>
      )}
    </div>
  );
}
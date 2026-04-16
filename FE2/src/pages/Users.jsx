import { useEffect, useState } from "react";
import API from "../api/api";
import AddUserModal from "../components/AddUserModal";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await API.users.getAll();
      setUsers(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa user?");
    if (!confirmDelete) return;

    try {
      await API.users.delete(id);
      fetchUsers();
      alert("Xóa user thành công");
    } catch (error) {
      console.log(error);
      alert("Xóa thất bại");
    }
  };

  const updateUser = async (user) => {
    const username = prompt("Nhập username mới", user.username);
    const email = prompt("Nhập email mới", user.email);

    if (!username || !email) return;

    try {
      await API.users.update(user.id, {
        username,
        email,
      });

      fetchUsers();
      alert("Cập nhật user thành công");
    } catch (error) {
      console.log(error);
      alert("Cập nhật thất bại");
    }
  };

  return (
    <div className="page-card">
      <div className="page-header">
        <h2>Users Management</h2>

        <button
          className="github-btn"
          onClick={() => setShowAddModal(true)}
        >
          + Add User
        </button>
      </div>

      {showAddModal && (
        <AddUserModal
          onClose={() => setShowAddModal(false)}
          onSuccess={fetchUsers}
        />
      )}

      <table className="github-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th width="180">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.id}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>
                <span className="badge">{u.role}</span>
              </td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => updateUser(u)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteUser(u.id)}
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
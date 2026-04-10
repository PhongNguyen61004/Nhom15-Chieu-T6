import { useState } from "react";
import { userAPI } from "../../services/api";
import EditUserModal from "./EditUserModal";

export default function UserTable({ users, reload }) {
  const [editingUser, setEditingUser] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa?")) return;
    try {
      await userAPI.deleteUser(id);
      reload();
    } catch (err) {
      alert("Xóa thất bại!");
    }
  };

  return (
    <>
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Chỉnh sửa</th>
          </tr>
        </thead>
        <tbody>
          {(users || []).map((u) => (
            <tr key={u._id}>
              <td>{u._id}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                {/* ✅ NÚT SỬA */}
                <button
                  className="action-btn btn-edit"
                  onClick={() => setEditingUser(u)}
                >
                  Sửa
                </button>

                {/* ✅ NÚT XÓA */}
                <button
                  className="action-btn btn-delete"
                  onClick={() => handleDelete(u._id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ MODAL EDIT */}
      {editingUser && (
        <EditUserModal
          user={editingUser}
          reload={reload}
          onClose={() => setEditingUser(null)}
        />
      )}
    </>
  );
}

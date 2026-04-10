import { useState } from "react";
import { userAPI } from "../../services/api";

export default function EditUserModal({ user, onClose, reload }) {
  const [username, setUsername] = useState(user.username || "");
  const [email, setEmail] = useState(user.email || "");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await userAPI.updateUser(user._id, {
  username,
  email,
});

      reload();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Cập nhật thất bại!");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Sửa User</h2>
        <form onSubmit={submit}>

          {/* ✅ FIX Ở ĐÂY */}
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />

          <button type="submit">Update</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

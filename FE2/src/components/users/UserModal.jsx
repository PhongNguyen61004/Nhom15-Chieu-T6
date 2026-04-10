import { useState } from "react";
import { userAPI } from "../../services/api";

export default function UserModal({ onClose, reload }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const submit = async (e) => {
  e.preventDefault();

  if (!username || !email) {
    alert("Nhập đầy đủ!");
    return;
  }

  try {
    await userAPI.createUser({
  username,
  email,
});

    reload();
    onClose();
  } catch (err) {
    console.error(err);
    alert("Thêm user thất bại!");
  }
};

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Thêm User</h2>
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

          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}


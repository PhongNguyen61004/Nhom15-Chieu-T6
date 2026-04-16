import { useState } from "react";
import API from "../api/api";
import Modal from "./Modal";

export default function AddUserModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    id: "",
    username: "",
    email: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.users.create({
        id: Number(form.id),
        username: form.username,
        email: form.email,
      });

      alert("Thêm user thành công");
      onSuccess();
      onClose();
    } catch (err) {
      console.log(err);
      alert("Lỗi khi thêm user");
    }
  };

  return (
    <Modal title="Thêm User Mới" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="id"
          placeholder="User ID (số)"
          value={form.id}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="username"
          placeholder="Tên người dùng"
          value={form.username}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Địa chỉ Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <button className="github-btn" type="submit">Xác nhận Thêm</button>
      </form>
    </Modal>
  );
}
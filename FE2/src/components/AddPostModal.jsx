import { useState } from "react";
import API from "../api/api";
import Modal from "./Modal";

export default function AddPostModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    userId: "",
    title: "",
    content: "",
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
      await API.posts.create({
        userId: form.userId,
        title: form.title,
        content: form.content,
      });

      alert("Thêm post thành công");
      onSuccess();
      onClose();
    } catch (err) {
      console.log(err);
      alert("Lỗi khi thêm post");
    }
  };

  return (
    <Modal title="Tạo Bài Viết Mới" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="userId"
          placeholder="User ID"
          value={form.userId}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="title"
          placeholder="Tiêu đề bài viết"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="content"
          placeholder="Nội dung bài viết..."
          value={form.content}
          onChange={handleChange}
          required
        />

        <button className="github-btn" type="submit">Đăng Bài</button>
      </form>
    </Modal>
  );
}
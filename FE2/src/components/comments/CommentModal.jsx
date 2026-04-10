import { useState } from "react";
import { commentAPI } from "../../services/api";

export default function CommentModal({ comment, onClose }) {
  const [content, setContent] = useState(comment?.content || "");

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Chi tiết Comment</h2>

        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
}

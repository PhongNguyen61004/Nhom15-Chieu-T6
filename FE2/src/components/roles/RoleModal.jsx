import { useState } from "react";
import { roleAPI } from "../../services/api";

export default function RoleModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Role được quản lý ở Backend</h2>
        <button onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
}


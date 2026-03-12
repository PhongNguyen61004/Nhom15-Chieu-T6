import React from 'react';
import { FiEdit2, FiTrash2, FiMoreVertical } from 'react-icons/fi';
import { HiOutlineUser } from 'react-icons/hi2';

const UserCard = ({ user, onEdit, onDelete }) => {
  // Generate random avatar color
  const avatarColors = ['#3b49df', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];
  const randomColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];

  return (
    <article className="user-card">
      <div className="card-header">
        <div className="user-avatar" style={{ backgroundColor: randomColor }}>
          <HiOutlineUser />
        </div>
        <div className="user-info">
          <h3 className="user-name">{user.name}</h3>
          <p className="user-id">ID: {user.id}</p>
        </div>
        <div className="card-actions">
          <button className="action-btn" onClick={() => onEdit(user)} title="Edit">
            <FiEdit2 />
          </button>
          <button className="action-btn danger" onClick={() => onDelete(user.id)} title="Delete">
            <FiTrash2 />
          </button>
        </div>
      </div>

     
    </article>
  );
};

export default UserCard;

import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar-left">
      <div className="logo">DevBlog Admin</div>

      <ul className="nav-menu">
        <li className="nav-item">
          <NavLink to="/users">👥 Quản lý người dùng</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/comments">💬 Quản lý bình luận</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/roles">🛡️ Quản lý phân quyền</NavLink>
        </li>
      </ul>

      <div className="admin-profile">
        <div className="avatar">A</div>
        <div>
          <div>Admin User</div>
          <div>@superadmin</div>
        </div>
      </div>
    </aside>
  );
}

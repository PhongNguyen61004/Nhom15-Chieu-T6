import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>DevBlog Admin</h2>

      <NavLink to="/">Dashboard</NavLink>
      <NavLink to="/users">Users</NavLink>
      <NavLink to="/tags">Tags</NavLink>
      <NavLink to="/posts">Posts</NavLink>
      <NavLink to="/comments">Comments</NavLink>
    </div>
  );
}
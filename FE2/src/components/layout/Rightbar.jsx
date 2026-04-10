export default function Rightbar() {
  return (
    <aside className="sidebar-right">
      <input className="search-bar" placeholder="Tìm kiếm..." />

      <div className="widget-card">
        <h3>Trạng thái API</h3>
        <div className="stat-item">
          <span>GET /users</span>
          <span style={{ color: "green" }}>200 OK</span>
        </div>
        <div className="stat-item">
          <span>GET /comments</span>
          <span style={{ color: "green" }}>200 OK</span>
        </div>
        <div className="stat-item">
          <span>GET /roles</span>
          <span style={{ color: "green" }}>200 OK</span>
        </div>
      
      </div>
    </aside>
  );
}

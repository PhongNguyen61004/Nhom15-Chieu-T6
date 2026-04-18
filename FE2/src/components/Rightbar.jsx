export default function Rightbar({ stats }) {
  const currentStats = stats || {};
  
  return (
    <div className="rightbar">
      <h3>Quick Summary</h3>
      <div className="summary-item">
        <span>Users:</span> <strong>{currentStats.users || 0}</strong>
      </div>
      <div className="summary-item">
        <span>Posts:</span> <strong>{currentStats.posts || 0}</strong>
      </div>
      <div className="summary-item">
        <span>Active Tags:</span> <strong>{currentStats.tags || 0}</strong>
      </div>
      
      <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #d0d7de' }} />
      
      <div className="admin-info">
        <p style={{ fontSize: '12px', color: '#57606a' }}>Logged in as:</p>
        <strong>Administrator</strong>
      </div>
    </div>
  );
}
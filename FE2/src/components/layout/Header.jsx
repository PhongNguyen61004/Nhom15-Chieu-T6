export default function Header({ title, onCreate }) {
  return (
    <div className="header">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        
        <h2>{title}</h2>

        {onCreate && (
          <button onClick={onCreate}>
            + Thêm
          </button>
        )}

      </div>
    </div>
  );
}

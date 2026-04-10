import { roleAPI } from "../../services/api";

export default function RoleTable({ roles }) {
  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Role</th>
          <th>Mô tả</th>
        </tr>
      </thead>
      <tbody>
        {(roles || []).map((r) => (
          <tr key={r.roleValue}>
            <td>{r.roleValue}</td>
            <td>{r.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

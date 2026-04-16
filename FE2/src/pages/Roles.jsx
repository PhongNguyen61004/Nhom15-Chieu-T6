import { useEffect, useState } from "react";
import API from "../api/api";

export default function Roles() {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    const res = await API.roles.getAll();
    setRoles(res.data.data);
  };

  const assignRole = async () => {
    const userId = prompt("Nhập MongoDB _id của user");
    if (!userId) return;
    const role = prompt("Nhập role: user/admin");
    if (!role) return;

    try {
      await API.roles.assign(userId, role);
      alert("Cấp quyền thành công");
    } catch (error) {
      alert("Cấp quyền thất bại");
    }
  };

  return (
    <div className="page-card">
      <div className="page-header">
        <h2>Roles Management</h2>
        <button className="github-btn" onClick={assignRole}>
          + Assign Role
        </button>
      </div>

      <table className="github-table">
        <thead>
          <tr>
            <th>Role</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((r, i) => (
            <tr key={i}>
              <td>
                <span className="badge">{r.roleValue}</span>
              </td>
              <td>{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
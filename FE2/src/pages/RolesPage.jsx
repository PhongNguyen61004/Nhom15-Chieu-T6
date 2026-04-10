import { useEffect, useState } from "react";
import { roleAPI } from "../services/api";
import RoleTable from "../components/roles/RoleTable";

export default function RolesPage() {
  const [roles, setRoles] = useState([]);

  const load = async () => {
    try {
      const res = await roleAPI.getAll();
      setRoles(res.data?.data || res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="content-body">
      <div className="header">
        <h2>Quản lý phân quyền</h2>
      </div>
      <RoleTable roles={roles} reload={load} />
    </div>
  );
}


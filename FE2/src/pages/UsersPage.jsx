import { useEffect, useState } from "react";
import { userAPI } from "../services/api";
import UserTable from "../components/users/UserTable";
import UserModal from "../components/users/UserModal";

export default function UsersPage() {
  const [users, setUsers] = useState([]); 
  const [show, setShow] = useState(false);

  const loadUsers = async () => {
  try {
    const res = await userAPI.getAllUsers();
setUsers(res.data.data); 

  } catch (err) {
    console.error(err);
  }
};

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="content-body">
      <div className="header">
        <h2>Quản lý người dùng</h2>
      </div>

      <div className="header-btn-add">
        <button  onClick={() => setShow(true)}>
        + Thêm User
        </button>
      </div>

      <UserTable users={users} reload={loadUsers} />

      {show && (
        <UserModal onClose={() => setShow(false)} reload={loadUsers} />
      )}
    </div>
  );
}

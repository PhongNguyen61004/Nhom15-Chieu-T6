import { useEffect, useState } from "react";
import { commentAPI } from "../services/api";
import CommentTable from "../components/comments/CommentTable";
import CommentModal from "../components/comments/CommentModal";

export default function CommentsPage() {
  const [comments, setComments] = useState([]);
  const [show, setShow] = useState(false); // ✅ thêm
  const [editing, setEditing] = useState(null);
  const load = async () => {
    try {
      const res = await commentAPI.getAll();
      setComments(res.data?.data || res.data || []);
    } catch (err) {
      console.log("ERROR:", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="content-body">
      <div className="header">
        <h2>Quản lý bình luận</h2>
      </div>
      
      <CommentTable
  comments={comments}
  reload={load}
  onEdit={(c) => {
    setEditing(c);
    setShow(true);
  }}
/>

{show && (
  <CommentModal
    comment={editing}
    onClose={() => setShow(false)}
    reload={load}
  />
)}
    </div>
  );
}

import { useEffect, useState } from "react";
import { getComments, deleteComment } from "../api/api";

export default function Comments() {
  const [comments, setComments] = useState([]);

  const fetchData = async () => {
    const res = await getComments();
    setComments(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="page-card">
      <h2>Comments</h2>

      <table className="github-table">
        <thead>
          <tr>
            <th>Content</th>
            <th>Post ID</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((c) => (
            <tr key={c._id}>
              <td>{c.content}</td>
              <td><span className="badge">{c.postId}</span></td>
              <td>
                <span style={{ color: c.isDeleted ? 'red' : 'green' }}>
                  {c.isDeleted ? 'Deleted (Soft)' : 'Active'}
                </span>
              </td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteComment(c._id).then(fetchData)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
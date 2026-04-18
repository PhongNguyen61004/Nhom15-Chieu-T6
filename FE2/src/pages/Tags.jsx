import { useEffect, useState } from "react";
import { getTags, deleteTag, createTag, updateTag } from "../api/api";
import Modal from "../components/Modal";

export default function Tags() {
  const [tags, setTags] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "", slug: "", description: "" });

  const fetchData = async () => {
    const res = await getTags();
    setTags(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = (tag = null) => {
    if (tag) {
      setEditingId(tag._id);
      setFormData({ name: tag.name, slug: tag.slug, description: tag.description || "" });
    } else {
      setEditingId(null);
      setFormData({ name: "", slug: "", description: "" });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateTag(editingId, formData);
      } else {
        await createTag(formData);
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      alert("Lỗi: " + (err.message || "Hãy kiểm tra lại (Có thể slug đã tồn tại)"));
    }
  };

  return (
    <div className="page-card">
      <div className="page-header">
        <h2>Tags</h2>
        <button className="github-btn" onClick={() => handleOpenModal()}>Add Tag</button>
      </div>

      <table className="github-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Slug</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tags.map((t) => (
            <tr key={t._id}>
              <td>{t.name}</td>
              <td><span className="badge">{t.slug}</span></td>
              <td>{t.description}</td>
              <td>
                <button className="edit-btn" onClick={() => handleOpenModal(t)}>Edit</button>
                <button className="delete-btn" onClick={() => deleteTag(t._id).then(fetchData)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <Modal title={editingId ? "Edit Tag" : "Add Tag"} onClose={() => setIsModalOpen(false)}>
          <form onSubmit={handleSubmit} className="modal-form">
            <input placeholder="Tag Name" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
            <input placeholder="Slug (e.g. react-js)" required value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} />
            <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
            <button className="github-btn" type="submit">Save</button>
          </form>
        </Modal>
      )}
    </div>
  );
}
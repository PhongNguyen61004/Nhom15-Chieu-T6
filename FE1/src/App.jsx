import React, { useState, useEffect } from 'react';
import { userAPI } from './services/api';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import UserCard from './components/UserCard';
import UserModal from './components/UserModal';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeView, setActiveView] = useState('users');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await userAPI.getAllUsers();
      setUsers(response.data.data || []);
    } catch (err) {
      setError('Failed to load users. Please check if the backend is running.');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle create/update user
  const handleSubmit = async (userData) => {
    try {
      setLoading(true);
      if (editingUser) {
        await userAPI.updateUser(editingUser.id, userData);
      } else {
        await userAPI.createUser(userData);
      }
      setIsModalOpen(false);
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      alert('Error: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  // Handle delete user
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      setLoading(true);
      await userAPI.deleteUser(id);
      fetchUsers();
    } catch (err) {
      alert('Error deleting user!');
    } finally {
      setLoading(false);
    }
  };

  // Handle edit user
  const handleEdit = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  // Handle create new user
  const handleCreate = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Header onCreateClick={handleCreate} />

        <div className="app-container">
          <Sidebar activeView={activeView} onViewChange={setActiveView} />

          <main className="main-content">
            <Routes>
              {/* Route /users */}
              <Route path="/users" element={
                <>
                  <div className="content-header">
                    <h1 className="page-title">All Users</h1>
                    <p className="page-subtitle">
                      Manage and view all registered users
                    </p>
                  </div>

                  {error && (
                    <div className="alert alert-error">
                      <span>⚠️ {error}</span>
                      <button onClick={() => setError(null)}>×</button>
                    </div>
                  )}

                  {loading && (
                    <div className="loading-container">
                      <div className="loading-spinner"></div>
                      <p>Loading users...</p>
                    </div>
                  )}

                  {!loading && users.length === 0 && !error && (
                    <div className="empty-state">
                      <div className="empty-icon">👥</div>
                      <h2 className="empty-title">No users yet</h2>
                      <p className="empty-text">
                        Get started by creating your first user!
                      </p>
                      <button className="btn-primary" onClick={handleCreate}>
                        Create First User
                      </button>
                    </div>
                  )}

                  {!loading && users.length > 0 && (
                    <div className="users-grid">
                      {users.map((user) => (
                        <UserCard
                          key={user.id}
                          user={user}
                          onEdit={handleEdit}
                          onDelete={handleDelete}
                        />
                      ))}
                    </div>
                  )}
                </>
              } />

              <Route path="/" element={
                <>{window.location.pathname === '/' && window.location.replace('/users')}</>
              } />
            </Routes>
          </main>

          <aside className="right-sidebar">
            <div className="sidebar-widget">
              <h3 className="widget-title">#trending tags</h3>
              <div className="trending-tags">
                <a href="#" className="trending-tag">#javascript</a>
                <a href="#" className="trending-tag">#react</a>
                <a href="#" className="trending-tag">#webdev</a>
                <a href="#" className="trending-tag">#programming</a>
                <a href="#" className="trending-tag">#beginners</a>
              </div>
            </div>

            <div className="sidebar-widget">
              <h3 className="widget-title">📊 Statistics</h3>
              <div className="stats-list">
                <div className="stat-row">
                  <span>Total Users</span>
                  <strong>{users.length}</strong>
                </div>
                <div className="stat-row">
                  <span>Active Today</span>
                  <strong>12</strong>
                </div>
                <div className="stat-row">
                  <span>New This Week</span>
                  <strong>8</strong>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <UserModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingUser(null);
          }}
          onSubmit={handleSubmit}
          editingUser={editingUser}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;

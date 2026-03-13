import { useEffect, useState } from "react"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import UserCard from "./components/UserCard"
import UserModal from "./components/UserModal"

import { getUsers, createUser, updateUser, deleteUser } from "./services/api"

function App() {

  const [users, setUsers] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)

  // load users
  const loadUsers = async () => {
    const res = await getUsers()
    setUsers(res.data || [])
  }

  useEffect(() => {
    loadUsers()
  }, [])

  // create or update
  const handleSave = async (data) => {

    if(editingUser){
      await updateUser(editingUser.id, data)
    }else{
      await createUser(data)
    }

    setModalOpen(false)
    setEditingUser(null)
    loadUsers()
  }

  // delete
  const handleDelete = async (id)=>{
    await deleteUser(id)
    loadUsers()
  }

  return (
    <div className="layout">

      <Header onCreateClick={()=>setModalOpen(true)}/>

      <div className="main">

        <Sidebar/>

        <div className="users-grid">

          {users.map(user=>(
            <UserCard
              key={user.id}
              user={user}
              onEdit={(u)=>{
                setEditingUser(u)
                setModalOpen(true)
              }}
              onDelete={handleDelete}
            />
          ))}

        </div>

      </div>

      {modalOpen && (
        <UserModal
          user={editingUser}
          onClose={()=>setModalOpen(false)}
          onSave={handleSave}
        />
      )}

    </div>
  )
}

export default App
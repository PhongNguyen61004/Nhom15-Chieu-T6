import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/layout/Sidebar";
import Rightbar from "./components/layout/Rightbar";

import UsersPage from "./pages/UsersPage";
import RolesPage from "./pages/RolesPage";
import CommentsPage from "./pages/CommentsPage";

import "./App.css";

function App() {
  return (
    <BrowserRouter> 
      <div className="container"> 
        <Sidebar /> 
        <main className="main-content"> 
        <Routes> <Route path="/" element={<Navigate to="/users" />} /> 
        <Route path="/users" element={<UsersPage />} /> 
        <Route path="/roles" element={<RolesPage />} /> 
        <Route path="/comments" element={<CommentsPage />} /> 
        </Routes> </main> <Rightbar /> 
      </div> 
    </BrowserRouter>
  );
}
export default App;

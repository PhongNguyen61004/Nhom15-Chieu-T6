import axios from "axios"

const API = axios.create({
  baseURL: "https://nhom15-chieu-t6.onrender.com"
})

export const getUsers = ()=> API.get("/users")

export const createUser = (data)=> API.post("/users", data)

export const updateUser = (id,data)=> API.put(`/users/${id}`, data)

export const deleteUser = (id)=> API.delete(`/users/${id}`)
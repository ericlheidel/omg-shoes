import "./Users.css"
import { useEffect, useState } from "react"
import { getAllUsers } from "../../services/usersService.js"
import { User } from "./User.js"
import { UsersFilterBar } from "./UsersFilterBar.js"

export const UsersList = () => {
  const [allUsers, setAllUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  const getAndSetAllUsers = () => {
    getAllUsers().then((usersArray) => setAllUsers(usersArray))
  }

  useEffect(() => {
    getAndSetAllUsers()
  }, [])

  useEffect(() => {
    const matchingUsers = allUsers.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredUsers(matchingUsers)
  }, [allUsers, searchTerm])

  return (
    <div className="users-container">
      <h2>All Users</h2>
      <UsersFilterBar setSearchTerm={setSearchTerm} />
      <article className="users">
        {filteredUsers.map((userObj) => {
          return <User userObj={userObj} />
        })}
      </article>
    </div>
  )
}

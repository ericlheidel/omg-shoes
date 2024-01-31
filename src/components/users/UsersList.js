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
    const matchingUsers = allUsers.filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredUsers(matchingUsers)
  }, [allUsers, searchTerm])

  return (
    <div className="users-list-container">
      <UsersFilterBar setSearchTerm={setSearchTerm} />

      {filteredUsers.map((userObj) => {
        return <User userObj={userObj} />
      })}
    </div>
  )
}

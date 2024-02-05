import "./UsersList.css"
import { useEffect, useState } from "react"
import { getAllUsers } from "../../services/usersService.js"
import { User } from "./User.js"
import { UsersFilterBar } from "./UsersFilterBar.js"

export const UsersList = () => {
  const [allUsers, setAllUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortedUsers, setSortedUsers] = useState([])

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

  useEffect(() => {
    setSortedUsers(filteredUsers.sort((a, b) => a.name.localeCompare(b.name)))
  }, [filteredUsers])

  return (
    <div className="users-container">
      <h2>All Users</h2>
      <UsersFilterBar setSearchTerm={setSearchTerm} />
      <article className="users">
        {sortedUsers.map((userObj) => {
          return <User userObj={userObj} key={userObj.id} />
        })}
      </article>
    </div>
  )
}

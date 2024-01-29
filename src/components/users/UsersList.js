import { useEffect, useState } from "react"
import { getAllUsers } from "../../services/usersService.js"
import { User } from "./User.js"

export const UsersList = ({ currentUser }) => {
  const [allUsers, setAllUsers] = useState([])

  useEffect(() => {
    getAllUsers().then((usersArray) => {
      setAllUsers(usersArray)
    })
  }, [])

  return (
    <div className="users-list-container">
      <div>
        {allUsers.map((userObj) => {
          return <User userObj={userObj} />
        })}
      </div>
    </div>
  )
}

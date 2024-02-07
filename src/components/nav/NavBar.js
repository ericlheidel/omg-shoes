import { useEffect, useState } from "react"
import "./NavBar.css"
import { Link, useNavigate } from "react-router-dom"
import { getUserById } from "../../services/usersService.js"

export const NavBar = ({ currentUser }) => {
  const [user, setUser] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    getUserById(currentUser.id).then((userObj) => {
      setUser(userObj)
    })
  }, [currentUser])

  return (
    <>
      <div>
        <ul className="navbar">
          <img
            className="navbar-user-img"
            src={user.avatar}
            alt="User avatar"
          />
          <li className="navbar-item">
            <Link to={`/users/${currentUser.id}`}>Profile</Link>
          </li>
          <li className="navbar-item">
            <Link to="/shoes">All Shoes</Link>
          </li>
          <li className="navbar-item">
            <Link to="/users">Users</Link>
          </li>
          {currentUser.isAdmin && (
            <li className="navbar-item">
              <Link to={"/addshoe"}>Add Shoe to DB</Link>
            </li>
          )}
          <li className="navbar-item">
            <Link
              to=""
              onClick={() => {
                localStorage.removeItem("shoes_user")
                navigate("/", { replace: true })
              }}
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

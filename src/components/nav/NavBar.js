import "./NavBar.css"
import { Link, useNavigate } from "react-router-dom"

export const NavBar = ({ currentUser }) => {
  const navigate = useNavigate()

  return (
    <>
      <div>
        <ul className="navbar">
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

import "./User.css"
import { useEffect, useState } from "react"
import { getUserShoeCollectionByUserId } from "../../services/userShoeService.js"
import { Link, useNavigate } from "react-router-dom"
import { updateUserProfile } from "../../services/usersService.js"

export const User = ({
  userObj,
  currentUser,
  getAndSetAllUsers,
  setSortedUsers,
}) => {
  const [collectionAmount, setCollectionAmount] = useState(0)

  const navigate = useNavigate()

  useEffect(() => {
    getUserShoeCollectionByUserId(userObj.id).then((collectionArray) => {
      setCollectionAmount(collectionArray)
    })
  }, [userObj])

  const handleAdminChange = (isAdmin) => {
    const editedUser = {
      id: userObj.id,
      email: userObj.email,
      name: userObj.name,
      city: userObj.city,
      state: userObj.state,
      avatar: userObj.avatar,
      bio: userObj.bio,
      isAdmin,
    }
    updateUserProfile(editedUser).then((data) => getAndSetAllUsers(data))
  }

  const logoutNonMainAdmin = () => {
    if (currentUser.id !== 6) {
      localStorage.removeItem("shoes_user")
      navigate("/", { replace: true })
    }
  }

  return (
    <div className="user">
      <div className="user-img-div">
        <Link to={`/users/${userObj.id}`}>
          <img src={userObj.avatar} alt="User" className="user-img" />
        </Link>
      </div>
      <div className="user-name">{userObj.name}</div>
      <div className="user-list-info-div">
        <div className="user-list-location">
          {userObj.city}, {userObj.state}
        </div>
        <div className="user-amount">
          Shoes in Collection: {collectionAmount.length}
        </div>
      </div>
      {currentUser.isAdmin && !userObj.isAdmin && (
        <>
          <button
            className="admin-btn"
            onClick={() => {
              handleAdminChange(true)
            }}
          >
            Make Admin
          </button>
        </>
      )}
      {userObj.isAdmin && userObj.id !== 6 && (
        <button
          className="admin-btn"
          onClick={() => {
            handleAdminChange(false)
            logoutNonMainAdmin()
          }}
        >
          Remove Admin
        </button>
      )}
    </div>
  )
}

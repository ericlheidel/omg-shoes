import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getUserById } from "../../services/usersService.js"
import { ShoeCollection } from "../shoes/ShoeCollection.js"
import { Link } from "react-router-dom"

export const Profile = ({ currentUser }) => {
  const [user, setUser] = useState([])

  const { userId } = useParams()

  useEffect(() => {
    if (userId) {
      getUserById(userId).then((data) => {
        const userObj = data
        setUser(userObj)
      })
    }
  }, [userId])

  return (
    <div className="profile">
      <div className="avatar-div">
        <img src={user.avatar} alt="User Avatar" />
      </div>
      <div className="name-div">
        {user.firstName} {user.lastName}
      </div>
      <div className="location-div">
        {user.city}, {user.state}
      </div>
      <div className="bio-div">
        {user.bio} {user.hasEmoji && "👟"}
      </div>
      <div className="edit-btn">
        {user.id === currentUser.id && (
          <Link to={`/profile/${userId}/edit`}>
            <button>Edit Profile</button>
          </Link>
        )}
      </div>
      <div className="collection-div">
        <ShoeCollection userId={userId} />
      </div>
    </div>
  )
}

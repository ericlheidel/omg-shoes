import { Link } from "react-router-dom"

export const ProfileColumn = ({ userShoe }) => {
  return (
    <div className="profile">
      <div className="profile-div">
        <div className="profile-img-div">
          <Link to={`/users/${userShoe.user?.id}`}>
            <img
              src={userShoe.user?.avatar}
              alt="User Avatar"
              className="profile-img"
            />
          </Link>
        </div>
        <div className="user-name">{userShoe.user?.name}</div>
        <div className="user-info-div">
          <div className="user-bio">{userShoe.user?.bio}</div>
        </div>
        <div className="user-info-div">
          <div className="user-location">
            {userShoe.user?.city}, {userShoe.user?.state}
          </div>
        </div>
      </div>
    </div>
  )
}
